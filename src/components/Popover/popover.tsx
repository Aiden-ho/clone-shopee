import {
  useFloating,
  useHover,
  useInteractions,
  FloatingPortal,
  arrow,
  FloatingArrow,
  offset,
  shift,
  safePolygon,
  type Placement
} from '@floating-ui/react'
import React, { useRef, useState, useId, type ElementType } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initialOpen,
  placement
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen || false)
  const arrowRef = useRef(null)
  const id = useId()
  const { x, y, refs, context, strategy, middlewareData } = useFloating<HTMLElement>({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      shift(),
      arrow({
        element: arrowRef
      }),
      offset(10)
    ],
    placement: placement
  })

  const hover = useHover(context, {
    handleClose: safePolygon({
      buffer: 15 //px
    })
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {isOpen && (
        <FloatingPortal id={id}>
          <AnimatePresence>
            <motion.div
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
              ref={refs.setFloating}
              {...getFloatingProps()}
              className='rounded-sm border border-gray-200 shadow-sm'
            >
              {renderPopover}
              <FloatingArrow ref={arrowRef} context={context} width={16} className='fill-white' />
            </motion.div>
          </AnimatePresence>
        </FloatingPortal>
      )}
    </Element>
  )
}
