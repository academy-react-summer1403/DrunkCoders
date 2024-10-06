import {Button as NextUiButton} from '@nextui-org/react'

export function Button({children, className, ...props}) {
    return (
        <NextUiButton
            radius="full"
            className={`h-auto py-[6px] px-3 bg-primary-blue text-white ${className}`}
            {...props}
        >
            {children}
        </NextUiButton>
    )
}
