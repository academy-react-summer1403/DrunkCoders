import { Cancel2 } from '@assets/index';
import { Divider } from '@nextui-org/react';
import { Button } from '@components/index';
import { useDispatch, useSelector } from 'react-redux';
import { sortFilterActions } from '@store/index';

export function ReservationSort() {
  const courseOrder = useSelector((state) => state.sort.order);
  const dispatch = useDispatch();

  function handleOrder(orderIdentifier) {
    dispatch(sortFilterActions.setOrder(orderIdentifier));
  }

  return (
    <div className="flex items-center justify-between relative top-1" >
      <p className=" font-medium ml-2 text-[#787878]">ترتیب</p>

      <div className="flex items-center gap-2">
        <ButtonComp1 identifier={'accepted'}>تایید شده</ButtonComp1>
        <ButtonComp1 identifier={'notAccepted'}>تایید نشده</ButtonComp1>

        <Divider orientation="vertical" className="mx-4 h-[22px] dark:bg-white" />

        <ButtonComp2 />
      </div>
    </div>
  );

  function ButtonComp2() {
    return (
      <Button
        onClick={() => handleOrder('delete')}
        variant="bordered"
        startContent={<Cancel2 />}
        className="border border-[#FF5454] bg-transparent text-[#FF5454]"
      >
        حذف
      </Button>
    );
  }

  function ButtonComp1({ identifier, children }) {
    return (
      <Button
        onClick={() => handleOrder(identifier)}
        className={
          courseOrder === identifier
            ? 'border border-transparent'
            : 'border border-[#E4E4E4] bg-transparent text-black dark:text-white'
        }
      >
        {children}
      </Button>
    );
  }
}