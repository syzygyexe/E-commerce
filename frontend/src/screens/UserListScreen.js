import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  // State for the admin, in order to observe all profile's info.
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  // This state is brought in order to validate current user's status.
  // Namely, whether the current user is admin or not.
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // State for deleting a user
  const userDelete = useSelector((state) => state.userDelete);
  // Rename success to successDelete.
  const { success: successDelete } = userDelete;

  useEffect(() => {
    // If logged-in and admin, show user list when accesing /admin/userlist route.
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      // In order to avoid any possible vulnerabilities, If someone except for the admin
      // is trying to get an access to a /admin/userlist route, redirect him to /login route.
      history.push("/login");
    }
    // We are adding successDelete as a dependendancy, because we want to realod the page,
    // whenever the user is being deleted.
  }, [dispatch, history, userInfo, successDelete]);

  // Takes user id.
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  // Render user list for the admin.
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through the users which we got from the userList */}
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto: ${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: "green" }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
