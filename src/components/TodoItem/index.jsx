import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, List, Popconfirm, Space, Typography } from "antd";
import styled from "styled-components";

function TodoItem({
    children,
    done = false,
    onChange = () => {},
    onClickStatus = () => {},
    onDelete = () => {},
}) {
    return (
        <List.Item>
            <Space align="center" size={16}>
                <StyledParagraph editable={{ onChange }}>{children}</StyledParagraph>
                <Button
                    icon={<CheckCircleOutlined style={done ? { color: "#0f0" } : {}} />}
                    size="small"
                    onClick={onClickStatus}
                />
                <Popconfirm title={`Delete ${children}?`} onConfirm={onDelete}>
                    <Button icon={<DeleteOutlined />} size="small" />
                </Popconfirm>
            </Space>
        </List.Item>
    );
}

const StyledParagraph = styled(Typography.Paragraph)`
    margin-bottom: 0 !important;
`;

export default TodoItem;
