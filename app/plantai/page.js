'use client'
import React, { useState } from 'react';
import {Upload, message, Button, Image, Typography, Layout, Flex, Empty, Card, Statistic, Spin} from 'antd';
import CountUp from 'react-countup';
import { UploadOutlined } from '@ant-design/icons';
import Meta from "antd/es/card/Meta";

const { Header, Footer, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
const formatter = (value) => <CountUp end={value} separator="," />;
const PlantRecognition = () => {
    const [result, setResult] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [plantInfo, setPlantInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleUpload = async ({ file }) => {
        const base64 = await convertToBase64(file);
        setImagePreview(URL.createObjectURL(file));
        callApi(base64);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const callApi = (base64) => {
        console.log(base64);
        setLoading(true);
        fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: base64 })
        })
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                setResult(data?.result || []);
                console.log('111111', data)
                setPlantInfo({
                    name: data?.result?.[0].name || '解析失败',
                    description: '',
                });
            })
            .catch(error => {
                setLoading(false);
                console.error('Error:', error);
            });
    };
    // const uploadProps = {
    //     name: 'image',
    //     action: '/api',
    //     method: 'POST',
    //     onChange(info) {
    //         if (info.file.status !== 'uploading') {
    //             console.log(info.file, info.fileList);
    //         }
    //         if (info.file.status === 'done') {
    //             message.success(`${info.file.name} 上传成功`);
    //             setResult(info.file.response);
    //         } else if (info.file.status === 'error') {
    //             message.error(`${info.file.name} 上传失败`);
    //         }
    //     },
    // };

    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 64,
        paddingInline: 48,
        lineHeight: '64px',
        backgroundColor: '#49a966',
    };

    const contentStyle = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        // color: '#fff',
        backgroundColor: '#fff',
    };

    const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4096ff',
    };

    return (
        <Flex gap="middle" wrap="wrap">
            <Layout>
                <Header style={headerStyle}>北塘小学植物识别系统</Header>
                <Content style={contentStyle}>
                    <div>
                        <Upload
                            customRequest={handleUpload}
                            showUploadList={false}
                            accept="image/*"
                        >
                            <Button icon={<UploadOutlined/>}>给我一张你不认识的植物图片吧</Button>
                        </Upload>
                        {imagePreview && (
                            <div>
                                <Image src={imagePreview} width={200}/>
                            </div>
                        )}
                        <Spin tip="识别中，请稍后" size="small" spinning={loading}>
                            {result?.length > 0 ? (
                                <Flex horizontal gap="middle" justify="center">
                                    {result.map((i, index) => (
                                        <Card
                                            key={i + index}
                                            hoverable
                                            style={{ width: 240 }}
                                            onClick={() => window.open(i.baike_info.baike_url)}
                                            // cover={<img alt="北塘小学" src={i.baike_info.image_url + '?x-bce-process=image/resize,m_lfit,w_536,limit_1/quality,Q_70'} />}
                                        >
                                            <Meta title={i.name} description={(
                                                <>
                                                    <Statistic
                                                        // title={i.baike_info.description}
                                                        value={i.score * 100}
                                                        precision={2}
                                                        valueStyle={{ color: '#3f8600' }}
                                                        suffix="%"
                                                        formatter={formatter}
                                                    />
                                                    <Paragraph>
                                                        {i.baike_info.description}
                                                    </Paragraph>
                                                </>
                                            )} />

                                        </Card>
                                    ))}
                                </Flex>
                            ) : (!loading ?? <Empty description="暂无数据" />)}
                        </Spin>

                        {/*{plantInfo && (*/}
                        {/*    <div>*/}
                        {/*        <Title level={3}>{plantInfo.name}</Title>*/}
                        {/*        <Image src={imagePreview} width={200}/>*/}
                        {/*        <Paragraph>{plantInfo.description}</Paragraph>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                </Content>
                {/*<Footer style={footerStyle}>Footer</Footer>*/}
            </Layout>

        </Flex>
    );
};

export default PlantRecognition;