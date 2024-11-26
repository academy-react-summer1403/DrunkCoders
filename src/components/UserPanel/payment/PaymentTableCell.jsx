import React from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

export function PaymentTableCell({ columnKey, item, onAction }) {
  if (columnKey === 'peymentDate') {
    return <span>{new Date(item[columnKey]).toLocaleDateString('fa-IR')}</span>;
  }

  if (columnKey === 'accept') {
    return <span>{item[columnKey] ? 'تایید شده' : 'در انتظار تایید'}</span>;
  }

  if (columnKey === 'actions') {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">منو</Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key="details">
            <span onClick={() => onAction(item.paymentId, 'details')} className="flex">
              جزئیات پرداخت
            </span>
          </DropdownItem>
          <DropdownItem key="edit">
            <span onClick={() => onAction(item.paymentId, 'edit')} className="flex">
              ویرایش پرداخت
            </span>
          </DropdownItem>
          <DropdownItem key="upload">
            <span onClick={() => onAction(item.paymentId, 'upload')} className="flex">
              آپلود فیش
            </span>
          </DropdownItem>
          <DropdownItem key="delete" onClick={() => onAction(item.paymentId, 'delete')} className="text-danger" color="danger">
            حذف پرداخت
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }

  return <span>{item[columnKey]}</span>;
}
