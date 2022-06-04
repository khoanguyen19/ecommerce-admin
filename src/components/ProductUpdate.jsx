import React, { useState } from "react";
import styled from "styled-components";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { updateProducts } from "../redux/callApis";

const Container = styled.div`
  padding: 20px;
  margin: 20px 0;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.25);
`;

const Form = styled.form`
  display: flex;
  justify-content: space-around;
`;

const InfoUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;

const Input = styled.input`
  width: 350px;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  border: none;
  border-bottom: 1px solid #777;
  color: #000;
  margin-bottom: 10px;
`;

const Select = styled.select`
  width: 370px;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  color: #000;
  margin-bottom: 10px;
`;

const Option = styled.option``;

const ImgUpload = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;

const ImgUploadWrapper = styled.div``;

const Img = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 15px;
  margin-right: 16px;
`;

const UpdateIcon = styled(FileUploadOutlinedIcon)`
  font-size: 30px !important;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 6px 56px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  background-color: #030376;
  color: #ffffff;
  cursor: pointer;
`;

const ProductUpdate = () => {
  const [inputs, setInputs] = useState([]);
  const [inputsArray, setInputsArray] = useState([]);
  const [file, setFile] = useState(null);
  const [newImg, setNewImg] = useState("");

  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((p) => p._id === productId)
  );

  const handleChangeInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeInputsArray = (e) => {
    setInputsArray((prev) => {
      return { ...prev, [e.target.name]: e.target.value.split(",") };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getDate() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const newProduct = {
              ...product,
              ...inputs,
              img: downloadURL,
              ...inputsArray,
            };
            updateProducts(productId, newProduct, dispatch);
            setNewImg(downloadURL);
          });
        }
      );
    } else {
      const updatedProduct = { ...product, ...inputs, ...inputsArray };
      updateProducts(productId, updatedProduct, dispatch);
    }
  };

  return (
    <Container>
      <Form>
        <InfoUpload>
          <Label>Product name</Label>
          <Input
            name="title"
            type="text"
            onChange={handleChangeInputs}
            placeholder={product.title}
          />
          <Label>Description</Label>
          <Input name="description" type="text" onChange={handleChangeInputs} />
          <Label>Color</Label>
          <Input
            name="color"
            type="text"
            onChange={handleChangeInputsArray}
            placeholder={product.color.join(", ")}
          />
          <Label>Size</Label>
          <Input
            name="size"
            type="text"
            onChange={handleChangeInputsArray}
            placeholder={product.size.join(", ")}
          />
          <Label>Categories</Label>
          <Input
            name="categories"
            type="text"
            onChange={handleChangeInputsArray}
            placeholder={product.categories.join(", ")}
          />
          <Label>In stock</Label>
          <Select
            defaultValue={product.inStock.toString()}
            name="inStock"
            onChange={handleChangeInputs}
          >
            <Option value={product.inStock.toString()}>
              {product.inStock.toString()}
            </Option>
            <Option value={(!product.inStock).toString()}>
              {(!product.inStock).toString()}
            </Option>
          </Select>
        </InfoUpload>
        <ImgUpload>
          <ImgUploadWrapper>
            <Img src={newImg || product.img} />
            <Label htmlFor="file-upload">
              <UpdateIcon />
            </Label>
            <Input
              id="file-upload"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setNewImg(URL.createObjectURL(e.target.files[0]));
              }}
              style={{ display: "none" }}
            />
          </ImgUploadWrapper>
          <Button onClick={handleClick}>Update</Button>
        </ImgUpload>
      </Form>
    </Container>
  );
};

export default ProductUpdate;
