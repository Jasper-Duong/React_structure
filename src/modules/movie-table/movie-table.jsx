import { Button, Space, Table, Tag } from "antd";
import { useAsync } from "hooks/useAsync";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieListApi } from "services/movie";
import { formatDate } from "utils/common";

export default function MovieTable() {
  const navigate = useNavigate();
  const { state: data = [] } = useAsync({
    service: () => fetchMovieListApi(),
  });
  const columns = [
    {
      title: "Movie",
      dataIndex: "tenPhim",
      key: "tenPhim",
    },
    {
      title: "Premier",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      render(text, record) {
        console.log(record);
        return <span>{formatDate(text)}</span>;
      },
    },
    {
      title: "Review",
      dataIndex: "danhGia",
      key: "danhGia",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/admin/movie-management/${record.maPhim}/update`)}>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  return (
    <>
      <div className="text-right mb-3">
        <Button
          onClick={() => navigate("/admin/movie-management/create")}
          type="primary"
        >
          Create
        </Button>
      </div>
      <Table rowKey="maPhim" columns={columns} dataSource={data} />
    </>
  );
}
