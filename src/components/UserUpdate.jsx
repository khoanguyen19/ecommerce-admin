import React, { useState } from "react";
import styled from "styled-components";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { updateUsers } from "../redux/callApis";

const Container = styled.div`
  flex: 4;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px -1px rgba(0, 0, 0, 0.25);
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div``;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Label = styled.label`
  margin-bottom: 4px;
  font-weight: 700;
  color: #777;
`;

const Input = styled.input`
  width: 350px;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  border: none;
  border-bottom: 1px solid #777;
  color: #000;
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

const AvatarUpload = styled.div``;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  margin-right: 16px;
`;

const LabelImg = styled.label``;

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

const UserUpdate = () => {
  const [inputs, setInputs] = useState([]);
  const [file, setFile] = useState(null);
  const [newImg, setNewImg] = useState("");

  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const user = useSelector((state) =>
    state.users.users.find((u) => u._id === userId)
  );

  const handleChangeInputs = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const dispatch = useDispatch();

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
            const newUser = { ...user, ...inputs, img: downloadURL };
            updateUsers(userId, newUser, dispatch);
            setNewImg(downloadURL);
          });
        }
      );
    } else {
      const updatedUser = { ...user, ...inputs };
      updateUsers(userId, updatedUser, dispatch);
    }
  };

  return (
    <Container>
      <Title>Edit</Title>
      <Form>
        <Left>
          <UserInfo>
            <Label>Username</Label>
            <Input
              name="username"
              type="text"
              placeholder={user.username}
              onChange={handleChangeInputs}
            />
          </UserInfo>
          <UserInfo>
            <Label>Full name</Label>
            <Input
              name="fullname"
              type="text"
              placeholder={user.fullname}
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
            <Label>Email</Label>
            <Input
              name="email"
              type="email"
              placeholder={user.email}
              onChange={handleChangeInputs}
            />
          </UserInfo>
          <UserInfo>
            <Label>Phone</Label>
            <Input
              name="phone"
              type="text"
              placeholder={user.phone}
              onChange={handleChangeInputs}
            />
          </UserInfo>
          <UserInfo>
            <Label>Address</Label>
            <Input
              name="address"
              type="text"
              placeholder={user.address}
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
        </Left>
        <Right>
          <AvatarUpload>
            <Avatar src={newImg || user.img} />
            <LabelImg htmlFor="file">
              <UpdateIcon />
            </LabelImg>
            <Input
              id="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setNewImg(URL.createObjectURL(e.target.files[0]));
              }}
              type="file"
              style={{ display: "none" }}
            />
          </AvatarUpload>
          <Button onClick={handleClick}>Update</Button>
        </Right>
      </Form>
    </Container>
  );
};

export default UserUpdate;
