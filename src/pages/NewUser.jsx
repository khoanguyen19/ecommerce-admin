import React, { useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { addUsers } from "../redux/callApis";

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

const UserInfo = styled.div`
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

const UserGender = styled.div`
  display: flex;
  align-items: center;
`;

const GenderInput = styled.input`
  margin-right: 4px;
  outline: none;
`;

const GenderLabel = styled.label`
  font-size: 16px;
  color: #767676;
  margin-right: 20px;
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

export const NewUser = () => {
  const [inputs, setInputs] = useState();
  const [file, setFile] = useState(null);

  const handleChangeInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const dispatch = useDispatch();

  console.log(inputs);

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
            const user = { ...inputs, img: downloadURL };
            addUsers(user, dispatch);
          });
        }
      );
    } else {
      addUsers(inputs, dispatch);
    }
  };

  console.log(inputs);

  return (
    <Container>
      <Title>New User</Title>
      <Form>
        <UserInfo>
          <Label>Username</Label>
          <Input
            name="username"
            type="text"
            placeholder="khoangyen19"
            onChange={handleChangeInputs}
          />
        </UserInfo>
        <UserInfo>
          <Label>Full Name</Label>
          <Input
            name="fullname"
            type="text"
            placeholder="Khoa Nguyen"
            onChange={handleChangeInputs}
          />
        </UserInfo>
        <UserInfo>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            onChange={handleChangeInputs}
          />
        </UserInfo>
        <UserInfo>
          <Label>Address</Label>
          <Input
            name="address"
            type="text"
            placeholder="Danang, Vietnam"
            onChange={handleChangeInputs}
          />
        </UserInfo>
        <UserInfo>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            placeholder="khoanguyen1962001@gmail.com"
            onChange={handleChangeInputs}
          />
        </UserInfo>
        <UserInfo>
          <Label>Phone</Label>
          <Input
            name="phone"
            type="text"
            placeholder="076 360 2013"
            onChange={handleChangeInputs}
          />
        </UserInfo>
        <UserInfo>
          <Label>Gender</Label>
          <UserGender onChange={handleChangeInputs} name="gender">
            <GenderInput type="radio" name="gender" value="male" />
            <GenderLabel>Male</GenderLabel>
            <GenderInput type="radio" name="gender" value="female" />
            <GenderLabel>Female</GenderLabel>
            <GenderInput type="radio" name="gender" value="other" />
            <GenderLabel>Other</GenderLabel>
          </UserGender>
        </UserInfo>
        <UserInfo>
          <Label>Is Admin</Label>
          <Select
            onChange={handleChangeInputs}
            name="isAdmin"
            defaultValue="default"
          >
            <Option value="default" disabled>
              Choose this
            </Option>
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
        </UserInfo>
        <UserInfo>
          <Label htmlFor="user-file">Avatar</Label>
          <ImageInput
            id="user-file"
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
          />
        </UserInfo>
        <Button onClick={handleClick}>Create</Button>
      </Form>
    </Container>
  );
};
