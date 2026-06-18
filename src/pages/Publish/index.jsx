import {Breadcrumb, Button, Card, Form, Input, message, Radio, Select, Space, Upload} from 'antd'
import {Link, useSearchParams} from 'react-router-dom'
import './index.scss'
import RichEditor from '@/components/RichEditor';
import {useEffect, useRef, useState} from "react";
import {createArticleApi, getArticleByIdApi, updateArticleApi} from "@/apis/article";
import {PlusOutlined} from "@ant-design/icons";
import {useChannel} from "@/hooks/useChannel";


const {Option} = Select // 导入antd的Select组件，Option 是 Select 组件的子组件，必须配合 Select 使用。

const Publish = () => {
  const {channelList} = useChannel(); // 导入频道列表


  const cacheImageList = useRef([]) // 缓存已上传的图片
  const [imageList, setImageList] = useState([])
  const onUploadChange = (value) => {
    cacheImageList.current = value.fileList // // fileList 所有文件列表
  }
  // 如果当前为三图模式，已经完成了上传，选择单图只显示一张，再切换到三图继续显示三张。
  // 切换图片模式，从缓存取数据
  const [imageType, setImageType] = useState(0)
  const onRadioChange = (event) => {
    const type = event.target.value;
    setImageType(type)
    if (type === 1) {
      // 单图，截取第一张展示
      const imgList = cacheImageList.current[0] ? [cacheImageList.current[0]] : []
      setImageList(imgList)
    } else if (type === 3) {
      // 三图，取所有图片展示
      setImageList(cacheImageList.current)
    }
  }

  // 回填数据
  const [searchParams] = useSearchParams(); // 获取 URL 查询参数对象
  const articleId = searchParams.get("id"); // 从 URL 中提取文章 ID
  const [form] = Form.useForm(); // 创建表单实例，用于手动控制表单，Ant Design 组件库提供的方法

  useEffect(() => {
    const getArticleDetail = async () => {
      const res = await getArticleByIdApi(articleId);
      form.setFieldsValue({ //Ant Design Form 组件提供的方法，用于程序化设置表单字段的值
        ...res.data,
        type: res.data.cover.type,

      })
      setImageType(res.data.cover.type)
      setImageList(res.data.cover.images.map(url => {
        return {url}
      }))
    }
    // 只有在有id时才调用
    if (articleId) {
      getArticleDetail()
    }
  }, [articleId, form]);

  // 提交表单
  const onFinish = async (formValue) => {
    // 校验封面类型是否和实际的图片列表相同
    if (imageList.length !== imageType) {
      message.warning('封面类型和图片数量不匹配')
      return
    }
    const {title, content, channel_id} = formValue;
    const params = {
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => {
          if(item.response){
            return item.response.data.url // 新增时这样取
          }else {
            return item.url // 编辑时这样取
          }
        })
      },
      channel_id: channel_id
    }
    // 新增或者编辑
    if(articleId){
      await updateArticleApi(params,articleId)
    }else {
      await createArticleApi(params)
    }
    
    message.success(`${articleId ? '编辑文章成功' : '发布文章成功'}`)
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            {title: <Link to={'/'}>首页</Link>},
            {title: `${articleId ? '编辑文章' : '发布文章'}`},
          ]}
          />
        }
      >
        <Form
          labelCol={{span: 4}}
          wrapperCol={{span: 16}}
          initialValues={{type: 0}} // 表单初始值,封面类型默认无图,跟<Form.Item name="type">中的name一致
          onFinish={onFinish} // 表单提交成功后的处理函数
          form={form} // 手动控制表单
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{required: true, message: '请输入文章标题'}]}
          >
            <Input placeholder="请输入文章标题" style={{width: 400}}/>
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id" // 表单字段名称，用于表单数据绑定
            rules={[{required: true, message: '请选择文章频道'}]} //表单字段的验证规则，确保用户必须选择文章频道才能提交表单
          >
            <Select placeholder="请选择文章频道" style={{width: 400}}>
              {channelList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              {/* eslint-disable-next-line react/jsx-no-undef */}
              <Radio.Group onChange={onRadioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 &&
              <Upload
                listType="picture-card" // 上传列表的样式
                showUploadList // 显示已上传文件的列表
                name="image" // 上传文件的表单字段名
                action={'https://geek.itheima.net/v1_0/upload'}
                onChange={onUploadChange} 
                maxCount={imageType} // 限制最大上传数量
                multiple={imageType > 1} // 多选开关
                fileList={imageList} //	已上传文件列表
              >
                <div style={{marginTop: 8}}>
                  <PlusOutlined/>
                </div>
              </Upload>
            }
          </Form.Item>

          <Form.Item
            label="内容"
            name="content"
            rules={[{required: true, message: '请输入文章内容'}]}
          >
            {/* 富文本编辑器 */}
            <RichEditor 
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{offset: 4}}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? '编辑文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish