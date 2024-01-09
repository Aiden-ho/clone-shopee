import React, { ElementType, Fragment, useId, useState } from 'react'
import { FloatingPortal, useClick, useFloating, useInteractions } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

type CollapseSideProps = {
  children: React.ReactNode
  renderCollapseSide: React.ReactNode
  initialOpen?: boolean
  as?: ElementType
}

export default function CollapseSide({
  children,
  renderCollapseSide,
  initialOpen,
  as: Element = 'div'
}: CollapseSideProps) {
  const [isOpen, setIsOpen] = useState<boolean>(initialOpen || false)
  const id = useId()
  const { refs, context } = useFloating<HTMLElement>({
    open: isOpen,
    onOpenChange: setIsOpen
  })

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  return (
    <Fragment>
      <Element ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </Element>
      {isOpen && (
        <FloatingPortal id={id}>
          <AnimatePresence>
            <motion.div ref={refs.setFloating} {...getFloatingProps()}>
              {renderCollapseSide}
            </motion.div>
          </AnimatePresence>
        </FloatingPortal>
      )}
    </Fragment>
  )
}
