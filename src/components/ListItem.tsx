import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

const ListItem = (props: { item: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | null | undefined; icon: string | undefined; content: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined }) => {
  return (
    <div className='cursor-pointer w-full flex justify-between p-4 bg-transparent rounded-md border border-[#D1D5DB]'>
        <div className='flex gap-2 items-center'>
          <img src={props.icon} alt="" />
          {props.content}
        </div>
        {typeof props.item !== 'string' ? <p>{props.item}</p> : <img src= {props.item}/>}
    </div>
  )
}
export default ListItem
