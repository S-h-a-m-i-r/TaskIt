interface ListItemProps {
  item: string | undefined;
  icon: string | undefined;
  content: string;

}


const ListItem: React.FC<ListItemProps> = (props) =>  {
  const isImage = (item:any) => {
    if (typeof item === 'string') {
      return item.startsWith('data:image');
    }
  };
  return (
    <div className='cursor-pointer w-full flex justify-between p-4 bg-transparent rounded-md border border-[#D1D5DB]'>
        <div className='flex gap-2 items-center'>
          <img src={props.icon} alt="" />
          {props.content}
        </div>
        {isImage(props.item) ? (
        <img src={props.item} alt="Item" />
      ) : (
        <p>{props.item}</p>
      )}
    </div>
  )
}
export default ListItem
