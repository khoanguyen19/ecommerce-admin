import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getUsers } from "../redux/callApis";

const Container = styled.div`
  flex: 4;
  color: black;
  margin-top: 12px;
  margin-left: 20px;
`;

const UserNameWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: ${(props) => (props.passive ? "#f62020" : "#1ae41a")};
`;

const EditButton = styled.button`
  padding: 4px 20px;
  border: none;
  border-radius: 5px;
  margin-right: 16px;
  background-color: #1ae41a;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const DeleteIcon = styled(DeleteOutlineIcon)`
  font-size: 28px !important;
  color: #f62020 !important;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const users = useSelector((state) => state.users.users);
  console.log(users);

  const handleDelete = (id) => {
    deleteUsers(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "username",
      headerName: "User Name",
      width: 200,
      renderCell: (params) => {
        return (
          <UserNameWrapper>
            <UserAvatar
              src={
                params.row.img ||
                "https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
              }
              alt=""
            />
            <UserName>{params.row.username}</UserName>
          </UserNameWrapper>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        return (
          <>
            {params.row.status ? (
              <>
                <StatusDot /> Active
              </>
            ) : (
              <>
                <StatusDot passive /> Passive
              </>
            )}
            {params.row.status}
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/users/${params.row._id}`}>
              <EditButton>Edit</EditButton>
            </Link>
            <DeleteIcon onClick={() => handleDelete(params.row._id)} />
          </>
        );
      },
    },
  ];

  return (
    <Container>
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row._id}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
      />
    </Container>
  );
};

export default UserList;
