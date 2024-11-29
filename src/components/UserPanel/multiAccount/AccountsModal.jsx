import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@nextui-org/react";
import { Button, ModalCloseBtn } from "@components/index";
import { AddCircle, LoginPanel, LogOutPanel } from "@assets/index";
import { useSelector, useDispatch } from "react-redux";
import { tokenActions } from "@store/token-slice";
import { useNavigate } from "react-router-dom";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMultiUserProfile } from "@core/services/api/user.api";

export function AccountsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  

  // Accessing the users from the Redux store
  const users = useSelector((state) => state.token.users);
  users.map((user) =>{
    console.log('user: ' + user.id);
  })  
  let { data: multiUser } = useQueries({
    queries: users.map((user) => ({
      queryKey: ['single-user', user.id],
      queryFn: () => getMultiUserProfile(user),
      // enabled: Boolean(user.id),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
      }
    },
  })
  // console.log(multiUser);
  // const {data} = useQuery({
  //   queryKey: ['single-user'],
  //   queryFn: () => getMultiUserProfile(users[0].token)
  // })
  // const {data:second} = useQuery({
  //   queryKey: ['single-user'],
  //   queryFn: () => getMultiUserProfile(users[1].token)
  // })
  // console.log(data||[]);
  // console.log('second',second);

  function handleLogout() {
    dispatch(tokenActions.logout());
    navigate("/");
  }

  // Handler to log in a specific user
  function handleLogin(user) {
    // Dispatch logout first
    dispatch(tokenActions.logout());

    // Then log in the selected user
    dispatch(
      tokenActions.login({
        token: user.token,
        id: user.id,
        roles: user.roles,
      })
    );
    queryClient.invalidateQueries(['userProfileInfo'])
    navigate('/user-panel/dashboard')
  }

  function handleNewUser(){
    dispatch(tokenActions.logout());
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
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex gap-4 items-center justify-between"
                >
                  <div className="flex gap-4 items-center">
                    <Avatar
                      src={user.defaultProfilePic || "https://i.pravatar.cc/150"}
                      size="lg"
                    />
                    <div>
                      <p className="text-lg font-bold">
                        {user.username || `User ${user.id}`}
                      </p>
                      <p className="text-basic-gray">{user.id}</p>
                    </div>
                  </div>
                  {user.isOnline ? (
                    <span
                      onClick={handleLogout}
                      className="text-red-500 text-sm cursor-pointer transition ease-in-out hover:scale-125"
                    >
                      <LogOutPanel/>
                    </span>
                  ) : (
                    <span onClick={() => handleLogin(user)}
                    className="cursor-pointer transition ease-in-out hover:scale-125">
                      <LoginPanel/>
                    </span>
                  )}
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <div className="m-auto">
                <span className="flex justify-center cursor-pointer transition ease-in-out hover:scale-125" onClick={handleNewUser}>
                  <AddCircle />
                </span>
                <p className="text-basic-gray">اضافه کردن حساب کاربری</p>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
