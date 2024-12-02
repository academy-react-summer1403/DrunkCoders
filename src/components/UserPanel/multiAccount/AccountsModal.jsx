import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from '@nextui-org/react'
import { Button, ModalCloseBtn } from '@components/index'
import { AddCircle, LoginPanel, LogOutPanel } from '@assets/index'
import { useSelector, useDispatch } from 'react-redux'
import { tokenActions } from '@store/token-slice'
import { useNavigate } from 'react-router-dom'
import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import { getMultiUserProfile } from '@core/services/api/user.api'

export function AccountsModal({ isOpen, onClose }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const users = useSelector((state) => state.token.users)

  let { data: multiUser } = useQueries({
    queries: users.map((user) => ({
      enabled: isOpen,
      queryKey: ['single-user', user.id],
      queryFn: () => getMultiUserProfile(user.token),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
      }
    },
  })
  // console.log(multiUser)

  function handleLogout() {
    dispatch(tokenActions.logout())
    navigate('/')
  }

  // Handler to log in a specific user
  function handleLogin(user) {
    // Dispatch logout first
    dispatch(tokenActions.logout())

    // Then log in the selected user
    dispatch(
      tokenActions.login({
        token: user.token,
        id: user.id,
        roles: user.roles,
      }),
    )
    queryClient.invalidateQueries(['userProfileInfo'])
    navigate('/user-panel/dashboard')
  }

  function handleNewUser() {
    dispatch(tokenActions.logout())
    navigate('/auth')
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      hideCloseButton
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between">
              <p className="text-lg font-bold">حساب‌های کاربری</p>
              <ModalCloseBtn onClose={onClose} />
            </ModalHeader>
            <ModalBody>
              {users.map((user, index) => {
                const userProfile = multiUser && multiUser[index] // Match by index or shared key

                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar
                        src={
                          userProfile?.currentPictureAddress ||
                          'https://i.pravatar.cc/150'
                        }
                        size="lg"
                      />
                      <div>
                        <p className="text-lg font-bold">
                          {userProfile?.fName && userProfile?.lName
                            ? `${userProfile.fName} ${userProfile.lName}`
                            : `نام کاربری در دسترس نیست`}
                        </p>
                        <p className="text-basic-gray">
                          {userProfile?.phoneNumber ||
                            `شماره همراه در دسترس نیست`}
                        </p>
                      </div>
                    </div>
                    {user.isOnline ? (
                      <span
                        onClick={handleLogout}
                        className="cursor-pointer text-sm text-red-500 transition ease-in-out hover:scale-125"
                      >
                        <LogOutPanel />
                      </span>
                    ) : (
                      <span
                        onClick={() => handleLogin(user)}
                        className="cursor-pointer transition ease-in-out hover:scale-125"
                      >
                        <LoginPanel />
                      </span>
                    )}
                  </div>
                )
              })}
            </ModalBody>
            <ModalFooter>
              <div className="m-auto">
                <span
                  className="flex cursor-pointer justify-center transition ease-in-out hover:scale-125"
                  onClick={handleNewUser}
                >
                  <AddCircle />
                </span>
                <p className="text-basic-gray">اضافه کردن حساب کاربری</p>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
