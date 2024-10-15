import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'
import { FC, useRef } from 'react'

type TProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  header: string
  body?: string
  isLoading?: boolean
}
const AlertConfirmation: FC<TProps> = ({
  isOpen,
  onClose,
  onConfirm,
  header,
  body,
  isLoading = false,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {header}
          </AlertDialogHeader>
          <AlertDialogCloseButton />

          <AlertDialogBody>
            {body ? (
              <>{body}</>
            ) : (
              "Are you sure? You can't undo this action afterwards."
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme='red'
              onClick={() => {
                onConfirm()
                onClose()
              }}
              ml={3}
              isLoading={isLoading}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default AlertConfirmation
