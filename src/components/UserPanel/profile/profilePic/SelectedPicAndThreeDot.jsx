import { MoreVerticalCircle, Tick } from '@assets/index'

export function SelectedPicAndThreeDot({
  handleMoreIconClicked,
  data,
  selectedImg,
}) {
  return (
    <div className="flexC absolute right-2 top-2 gap-2">
      <div
        className="flexC h-8 w-8 cursor-pointer rounded-full bg-white"
        onClick={() => handleMoreIconClicked(data.key)}
      >
        <MoreVerticalCircle className="text-black" />
      </div>

      {selectedImg && (
        <div className="flexC h-8 w-8 rounded-full bg-[#17C964]">
          <Tick />
        </div>
      )}
    </div>
  )
}
