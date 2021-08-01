import React, { useState } from 'react';
import { Modal, Form, Input, Cascader, Button } from 'antd';
import area from './area';
import stc from '../assets/onekey/STC.png';
import staff0 from '../assets/onekey/0.png';
import staff1 from '../assets/onekey/1.png';
import staff2 from '../assets/onekey/2.png';
import staff3 from '../assets/onekey/3.png';
import staff4 from '../assets/onekey/4.png';
import staff5 from '../assets/onekey/5.png';
import staff6 from '../assets/onekey/6.png';
import staff7 from '../assets/onekey/7.png';
import './index.css';

const FormItem = Form.Item;

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        title="请填写购买信息"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={async () => {
          const values = await form.validateFields();
          console.log('values: ', values)
          setVisible(false)
        }}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
        >
          <FormItem
            label="交易地址"
            name="tradeaddr"
            rules={[
              {
                required: true,
                message: '请填写交易地址',
              },
            ]}
          >
            <Input placeholder="请填写" />
          </FormItem>
          <FormItem
            label="收件人"
            name="name"
            rules={[
              {
                required: true,
                message: '请填写收件人',
              },
            ]}
          >
            <Input placeholder="请填写" />
          </FormItem>
          <FormItem
            label="电话号码"
            name="phone"
            rules={[
              {
                required: true,
                message: '请填写电话号码',
              },
            ]}
          >
            <Input placeholder="请填写" />
          </FormItem>
          <FormItem
            label="邮寄地址"
            name="area"
            rules={[
              {
                required: true,
                message: '请选择邮寄地址',
              },
            ]}
          >
            <Cascader
              options={area}
              placeholder="请选择"
              showSearch={(inputValue, path) => {
                return path.some(
                  (option) =>
                    option.label
                      .toLowerCase()
                      .indexOf(inputValue.toLowerCase()) > -1
                );
              }}
            />
          </FormItem>
          <FormItem
            label="邮政编码"
            name="zipcode"
            rules={[
              {
                required: true,
                message: '请填写邮政编码',
              },
            ]}
          >
            <Input placeholder="请填写" />
          </FormItem>
        </Form>
      </Modal>
      <img src={stc} alt="stc" className="img" />
      <div className="title">
        <span>【活动介绍】</span>
      </div>
      <div className="detail" style={{ marginBottom: 16 }}>
        <i>优惠一：</i>
        <div>原价：￥499</div>
        <div>使用STC购买价：600个STC</div>
        <div>运费：免运费</div>
      </div>
      <div className="detail">
        <i>优惠二：</i>
        <div>所有使用STC购买oneKey硬件钱包的用户均可参与抽取5台矿机</div>
        <div>活动时间：2021.08.0X-2021.08.0X，活动共计3天</div>
        <div>
          活动规则：活动限量购买，每人限量购买1台，总量300台先到先得，活动结束后从所有购买的用户抽取5位用户赠送矿机
        </div>
      </div>
      <div style={{ textAlign: 'center', margin: '16px 0' }}>
        <Button
          shape="round"
          type="primary"
          danger
          size="large"
          disabled={disabled}
          onClick={() => {
            setVisible(true);
          }}
        >
          立即购买
        </Button>
      </div>
      <img src={staff0} alt="stc" className="img" />
      <img src={staff1} alt="stc" className="img" />
      <div className="detail" style={{ marginBottom: 16 }}>
        <i>商品详情介绍</i>
        <i>
          *注意：因商品特殊，收货后非质量问题不退不换，发出后不接受一切由买家自身原因造成的退换行为。*
          *当前批次都是OneKey*Bixin联名周年限定款，机身所印logo为“Bixin",介意慎拍！*
        </i>
      </div>
      <img src={staff2} alt="stc" className="img" />
      <img src={staff3} alt="stc" className="img" />
      <img src={staff4} alt="stc" className="img" />
      <img src={staff5} alt="stc" className="img" />
      <img src={staff6} alt="stc" className="img" />
      <img src={staff7} alt="stc" className="img" />
    </div>
  );
};

export default Index;
