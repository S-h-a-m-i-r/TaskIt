import { useState } from "react"
import DashboardCard from "../../components/DashboardCard"
import {CardsData} from '../../../src/components/dummnyData/DummyData'
import AllTasksList from "./AllTasksList"
import extend from "../../assets/icons/extends_icon.svg"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar_desgin.css'
import CircularChart from "./chart/Chart"
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const chartData = [79, 29];
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/Tasks");
  };

  return (
    <div className="flex flex-col gap-5 p-9 dark:text-black">
      {/* dynamic name based on user */}
      <div className="flex gap-2 items-center">
        <h1 className="text-2xl font-semibold dark:text-black"> Good Morning {`Zain`}!</h1>
      </div>
      <div className="mt-14 flex flex-wrap gap-4">
        {CardsData.map((element, index) => (
          <DashboardCard
            key={index}
            title={element.title}
            percent={element.percent}
            count={element.count}
            icon={element.icon}
            path = {element.path}
          />
        ))}
      </div>
      <div className="flex gap-2 justify-between">
        <div className="max-w-[725px] w-full bg-white p-5 rounded-md">
              <div className="w-full flex items-center justify-between">  
                <h2 className="font-semibold text-2xl text-left">Tasks</h2>        
                <img src={extend} alt='extend' className="cursor-pointer" onClick={handleRedirect}/>
              </div>
              <AllTasksList/>
        </div>
       <div>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date || new Date())}
          inline
        />
        <div className=" bg-white rounded-md max-w-[379px] w-full p-6 flex flex-col gap-5">
          <h2 className="text-2xl "> Credits </h2>
          <div className="border border-gray-200 h-[1px] w-full"></div>
          <CircularChart data={chartData} />
        </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
