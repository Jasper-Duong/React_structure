import {
  Button,
  // Cascader,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  notification,
  Radio,
  // Select,
  Switch,
  // TreeSelect,
} from "antd";
import { GROUP_ID } from "constants/common";
import { useAsync } from "hooks/useAsync";
import { isEmpty } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addMovieUploadImage,
  fetchMovieDetailApi,
  updateMovieUploadImage,
} from "services/movie";

export default function MovieForm() {
  const [componentSize, setComponentSize] = useState("default");
  const params = useParams();
  const [img, setImg] = useState();
  const [file, setFile] = useState();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { state: movieDetail } = useAsync({
    service: () => fetchMovieDetailApi(params.movieId),
    deps: [params.movieId],
    condition: !!params.movieId,
  });
  useEffect(() => {
    if (movieDetail) {
      form.setFieldsValue({
        ...movieDetail,
        ngayKhoiChieu: moment(movieDetail.ngayKhoiChieu),
      });
      setImg(movieDetail.hinhAnh);
    }
  }, [movieDetail]);
  console.log(movieDetail);
  const onFormLayoutChange = (event) => {
    setComponentSize(event.target.value);
  };
  const handleSave = async (values) => {
    // format applied for MonentObject
    values.ngayKhoiChieu = values.ngayKhoiChieu.format("DD/MM/YYYY");
    values.maNhom = GROUP_ID;
    const formData = new FormData();
    for (const i in values) {
      formData.append(i, values[i]);
    }
    file && formData.append("File", file, file.name);
    // If updating -> add movieId to formData
    params.movieId && formData.append("maPhim", params.movieId);
    params.movieId
      ? await addMovieUploadImage(formData)
      : await updateMovieUploadImage(formData);
    notification.success({ description: "Successfully!" });
    navigate("/admin/movie-management");
  };
  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setImg(e.target.result);
      setFile(file);
    };
  };
  console.log(form.isFieldsTouched());
  return (
    <Form
      form={form}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="vertical"
      initialValues={{
        tenPhim: "",
        moTa: "",
        ngayKhoiChieu: "",
        sapChieu: true,
        dangChieu: true,
        trailer: "",
        hot: true,
        danhGia: "",
        maPhim: "",
      }}
      size={componentSize}
      onFinish={handleSave}
    >
      <Form.Item label="Form Size">
        <Radio.Group defaultValue={componentSize} onChange={onFormLayoutChange}>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="Movie"
        name="tenPhim"
        validateTrigger={["onBlur"]}
        rules={[
          { required: true, message: "Movie Name is required!" },
          {
            pattern:
              "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹsW|_]+$",
            message: "Movie Name does not match required pattern",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Trailer" name="trailer">
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        rules={[
          {
            validator: (rules, value) => {
              if (isEmpty(value)) {
                return Promise.reject("Description is required!");
              }
              if (value === "spammm") {
                return Promise.reject("Stop spamming our Description");
              }
              return Promise.resolve();
            },
          },
        ]}
        validateTrigger={["onBlur"]}
        name="moTa"
      >
        <Input />
      </Form.Item>
      <Form.Item label="Premier Date" name="ngayKhoiChieu">
        <DatePicker />
      </Form.Item>
      <Form.Item label="On Air" valuePropName="checked" name="dangChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Sneak Peak" valuePropName="checked" name="sapChieu">
        <Switch />
      </Form.Item>
      <Form.Item label="Block Burster" valuePropName="checked" name="hot">
        <Switch />
      </Form.Item>
      <Form.Item
        label="Rating (0->5)"
        name="danhGia"
        rules={[
          {
            min: 0,
            max: 5,
            message: "Rating ranging from 0 to 5!",
            type: "number",
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item label="Image" onChange={handleChangeImage}>
        <Input type="file" />
      </Form.Item>
      <Image src={img} />
      <Form.Item shouldUpdate>
        {() => {
          return (
            <Button
              disabled={
                !form.isFieldsTouched() ||
                form.getFieldsError().some((field) => field.errors.length > 0)
              }
              htmlType="submit"
              type="primary"
            >
              Save
            </Button>
          );
        }}
      </Form.Item>
    </Form>
  );
}
