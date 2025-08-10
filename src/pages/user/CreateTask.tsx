import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/icons/ArrowLeft_icon.svg';
import addOn from '../../assets/addon.png'
import { useState } from 'react';
import ButtonComponent from '../../components/generalComponents/ButtonComponent';
import FileUpload from '../../components/generalComponents/FileUpload';
import UploadProgress from '../../components/generalComponents/UploadProgress';
import useTaskStore from '../../stores/taskStore';
import { useFileUpload } from '../../hooks/useFileUpload';
import { message } from 'antd';
import { MAX_FILE_SIZE, MAX_FILES_COUNT } from '../../utils/fileUtils';

// Define types for the component
interface TaskFormData {
	title: string;
	description: string;
}

interface TaskStore {
	createTask: (payload: { title: string; description: string }) => Promise<{
		success: boolean;
		task: Task;
		message?: string;
	}>;
}

interface Task {
	_id: string;
}

const CreateTask = () => {
	const navigate = useNavigate();
	const { createTask } = useTaskStore() as TaskStore;
	const { uploadFiles, attachFilesToTask, uploading, progress, error, clearError } = useFileUpload();

	const [formData, setFormData] = useState<TaskFormData>({
		title: '',
		description: '',
	});
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [loading, setLoading] = useState(false);

	const handleGoBack = () => {
		navigate(-1);
	};

	const handleInputChange = (field: keyof TaskFormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleFilesChange = (files: File[]) => {
		setSelectedFiles(files);
		clearError(); // Clear any previous errors when files change
	};

	const handleSubmit = async () => {
		if (!formData.title.trim() || !formData.description.trim()) {
			message.error('Please fill in both title and description');
			return;
		}

		setLoading(true);
		try {
			// Create task first
			const result = await createTask({
				title: formData.title,
				description: formData.description,
			});
			if (result.success && result.task) {
				// If there are files, upload and attach them
				if (selectedFiles.length > 0) {
					try {
						// Upload files to S3
						const uploadedFiles = await uploadFiles(selectedFiles);
						
						// Attach files to the task
						const attached = await attachFilesToTask(result.task._id, uploadedFiles);
						
						if (attached) {
							message.success('Task created successfully with files!');
						} else {
							message.warning('Task created but file attachment failed. Please try again.');
						}
					} catch (fileError) {
						// Task was created but file upload failed
						message.warning('Task created but file upload failed. Please try uploading files again.');
						console.error('File upload error:', fileError);
					}
				} else {
					message.success('Task created successfully!');
				}
				
				navigate('/tasks'); // Navigate to tasks list
			} else {
				message.error(result.message || 'Failed to create task');
			}
		} catch (error) {
			const err = error as Error;
			message.error(err.message || 'Failed to create task');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-9 w-full flex flex-col gap-10">
			<div className="flex items-center gap-2">
				<div
					className="p-2 cursor-pointer bg-[#D1D5DB] rounded-full flex"
					onClick={handleGoBack}
				>
					<img src={backIcon} alt="back" />
				</div>
				<span className="font-semibold text-2xl"> Create New Task</span>
			</div>
			<div className="border border-[#D1D5DB] w-full"></div>
			<div>
				<div className="mb-4 w-full flex-1">
					<label
						htmlFor="title"
						className="block text-left font-semibold mb-5 text-2xl text-gray-700"
					>
						Add Title
					</label>
					<input
						type="text"
						id="title"
						name="title"
						value={formData.title}
						onChange={(e) => handleInputChange('title', e.target.value)}
						placeholder="write here"
						className="w-full px-2 py-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:none"
					/>
				</div>
				<div className="mb-4 w-full flex-1">
					<label
						htmlFor="description"
						className="block text-left font-semibold mb-5 text-2xl text-gray-700"
					>
						Add Description
					</label>
					<textarea
						id="description"
						name="description"
						value={formData.description}
						onChange={(e) => handleInputChange('description', e.target.value)}
						placeholder="write here"
						rows={10}
						className="w-full px-2 py-4 border bg-transparent border-gray-300 rounded-md focus:outline-none focus:none"
					/>
				</div>
				<div className="w-full flex max-md:flex-col max-md:gap-5 justify-between">
					<div className="flex flex-col gap-5 md:max-w-[415px] w-full">
						<h2 className="text-2xl font-semibold text-left">Attachments</h2>
						<FileUpload
							files={selectedFiles}
							onFilesChange={handleFilesChange}
							maxSize={MAX_FILE_SIZE}
							maxFiles={MAX_FILES_COUNT}
							acceptedTypes={['*/*']}
						/>
						{uploading && <UploadProgress progress={progress} className="mt-4" />}
						{error && (
							<div className="text-sm text-red-600 bg-red-50 p-2 rounded">
								{error}
							</div>
						)}
					</div>
					<div className="md:max-w-[340px] w-full">
						<div className="bg-white w-full md:max-w-[277px] h-[216px] flex flex-col gap-0.5 py-7 items-stretch justify-around justify-self-end px-10 mb-20 rounded-md">
							<p className="font-normal text-lg text-[#202224] leading-[1.5]">
								{' '}
								Credit required for this task
							</p>
							<p className="font-semibold text-3xl"> 01 </p>
							<div className="w-full justify-center flex px-10">
								<img src={addOn} alt="credit icon" width={30} />
							</div>
							<p className="text-primary-300 text-lg font-medium">
								{' '}
								12 credits left{' '}
							</p>
						</div>
					</div>
				</div>
				<div className="w-full px-72">
					<ButtonComponent
						className={`w-full rounded-xl py-3 text-xl ${
							loading || uploading
								? 'bg-gray-400 cursor-not-allowed'
								: 'bg-primary-50 hover:bg-primary-200'
						} text-white`}
						title={loading || uploading ? 'Creating...' : 'Create Task'}
						onClick={loading || uploading ? undefined : handleSubmit}
					/>
				</div>
			</div>
		</div>
	);
};

export default CreateTask;