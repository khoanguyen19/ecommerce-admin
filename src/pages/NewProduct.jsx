import React, { useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { addProducts } from "../redux/callApis";
import { useDispatch } from "react-redux";

const Container = styled.div`
  flex: 4;
  color: black;
  margin-top: 12px;
  margin-left: 20px;
`;

const Title = styled.h3`
  font-size: 22px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const ProductInfo = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-right: 40px;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: 700;
  color: #777;
`;

const Input = styled.input`
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  color: #000;
  border: 1px solid #777;
  border-radius: 5px;
`;

const ImageInput = styled(Input)`
  border: none;
`;

const Select = styled.select`
  padding: 8px 10px;
  font-size: 14px;
  color: #767676;
  border: 1px solid #777;
  border-radius: 5px;
`;

const Option = styled.option``;

const Button = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 32px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background-color: #030376;
  color: #ffffff;
`;

const NewProduct = () => {
  const [inputs, setInputs] = useState([]);
  const [inputsArray, setInputsArray] = useState([]);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

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
    const fileName = new Date().getTime() + file.name;
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
          const product = { ...inputs, img: downloadURL, ...inputsArray };
          addProducts(product, dispatch);
        });
      }
    );
  };

  return (
    <Container>
      <Title>New Product</Title>
      <Form>
        <ProductInfo>
          <Label>Name</Label>
          <Input
            name="title"
            onChange={handleChangeInputs}
            type="text"
            placeholder="Space-Wind Jacket"
          />
        </ProductInfo>
        <ProductInfo>
          <Label>Description</Label>
          <Input name="desc" onChange={handleChangeInputs} type="text" />
        </ProductInfo>
        <ProductInfo>
          <Label>Price</Label>
          <Input name="price" onChange={handleChangeInputs} type="number" />
        </ProductInfo>
        <ProductInfo>
          <Label>Color</Label>
          <Input
            name="color"
            onChange={handleChangeInputsArray}
            type="text"
            placeholder="red, blue, green"
          />
        </ProductInfo>
        <ProductInfo>
          <Label>Size</Label>
          <Input
            name="size"
            onChange={handleChangeInputsArray}
            type="text"
            placeholder="s, m, l"
          />
        </ProductInfo>
        <ProductInfo>
          <Label>Categories</Label>
          <Input
            name="categories"
            onChange={handleChangeInputsArray}
            type="text"
            placeholder="men, jeans"
          />
        </ProductInfo>
        <ProductInfo>
          <Label>In stock</Label>
          <Select onChange={handleChangeInputs} name="inStock">
            <Option value="yes">Yes</Option>
            <Option value="no">No</Option>
          </Select>
        </ProductInfo>
        <ProductInfo>
          <Label>Image</Label>
          <ImageInput
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
          />
        </ProductInfo>
        <Button onClick={handleClick}>Create</Button>
      </Form>
    </Container>
  );
};

export default NewProduct;
