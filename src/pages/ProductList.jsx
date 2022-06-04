import React, { useEffect } from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProducts, getProducts } from "../redux/callApis";

const Container = styled.div`
  flex: 4;
  color: black;
  margin-top: 12px;
  margin-left: 20px;
`;

const ProductNameWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
`;

const ProductName = styled.span`
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

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const products = useSelector((state) => state.product.products);

  const handleDelete = (id) => {
    deleteProducts(id, dispatch);
  };

  const numberWithCommas = (x) => {
    return x && x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Product",
      width: 240,
      renderCell: (params) => {
        return (
          <ProductNameWrapper>
            <ProductImg src={params.row.img} alt="" />
            <ProductName>{params.row.title}</ProductName>
          </ProductNameWrapper>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.status ? <StatusDot /> : <StatusDot passive />}
            {params.row.status ? "Active" : "Passive"}
          </>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 180,
      renderCell: (params) => {
        return <>{numberWithCommas(params.row.price)} đ</>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/products/${params.row._id}`}>
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
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
      />
    </Container>
  );
};

export default ProductList;
