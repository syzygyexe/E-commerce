import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  // State for the admin, in order to observe all orders info.
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  // This state is brought in order to validate current user's status.
  // Namely, whether the current user is admin or not.
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    // If logged-in and admin, show order list when accesing /admin/orderlist route.
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      // In order to avoid any possible vulnerabilities, If someone except for the admin
      // is trying to get an access to a /admin/orderlist route, redirect him to /login route.
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  // Render user list for the admin.
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through the users which we got from the userList */}
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                {/* Substing will give us a day */}
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
