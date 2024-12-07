import React, { useState } from 'react'
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { getPaymentList } from '@core/services/api/user.api'
import { PaymentTableCell } from './PaymentTableCell'
import { ActionModal } from './ActionModal'
import { PaymentModalContent } from './PaymentModalContent'
import './PaymentList.css' // Ensure you create this CSS file

export function PaymentList() {
  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['paidList'],
    queryFn: getPaymentList,
  })
  
  const [modalState, setModalState] = useState({
    isOpen: false,
    paymentId: null,
    action: null,
  })

  const columns = [
    { key: 'paid', label: 'مبلغ پرداختی (تومان)', hideOnSmall: true },
    { key: 'peymentDate', label: 'تاریخ پرداخت' },
    { key: 'paymentId', label: 'شناسه پرداخت', hideOnSmall: true }, // Add a property for conditional hiding
    { key: 'accept', label: 'تایید' },
    { key: 'actions', label: 'سایر' },
  ]

  if (isLoading) {
    return (
      <div className="mt-10 flex justify-center">
        <Spinner size="lg" label="در حال دریافت ..." labelColor="primary" />
      </div>
    )
  }

  if (isError) return <p>خطا در دریافت اطلاعات</p>

  if (!payments || payments.length === 0) {
    return <p className="text-center text-gray-500">هیچ پرداختی یافت نشد</p>
  }

  function handleModal(paymentId, action) {
    setModalState({ isOpen: true, paymentId, action })
  }

  function closeModal() {
    setModalState({ isOpen: false, paymentId: null, action: null })
  }

  return (
    <div className="no-scrollbar h-full w-full flex-col overflow-x-scroll rounded-2xl bg-white p-4 dark:bg-black">
      <Table
        aria-label="Courses table"
        removeWrapper
        classNames={{ th: 'text-base font-normal' }}
        color="primary"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              className={column.hideOnSmall ? 'hide-on-small' : ''}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={payments}>
          {(item) => (
            <TableRow key={item.paymentId}>
              {(columnKey) => (
                <TableCell
                  className={
                    columns.find((col) => col.key === columnKey)?.hideOnSmall
                      ? 'hide-on-small'
                      : ''
                  }
                >
                  <PaymentTableCell
                    columnKey={columnKey}
                    item={item}
                    onAction={handleModal}
                  />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <ActionModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        title={
          modalState.action === 'details'
            ? 'جزئیات پرداخت'
            : modalState.action === 'edit'
              ? 'ویرایش پرداخت'
              : modalState.action === 'upload'
                ? 'آپلود فیش'
                : 'حذف پرداخت'
        }
        content={
          <PaymentModalContent
            paymentId={modalState.paymentId}
            action={modalState.action}
          />
        }
      />
    </div>
  )
}
