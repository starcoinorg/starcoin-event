import React, { useState, useRef } from 'react';
import { Modal, Form, Input, Cascader, Button, message } from 'antd';
import BigNumber from 'bignumber.js';
import { addHexPrefix } from 'ethereumjs-util';
import { providers } from '@starcoin/starcoin';
import StarMaskOnboarding from '@starcoin/starmask-onboarding';
import request from '../utils/request';
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

const toAccount = '0x60A8349933B39a54a007bf882dE6bA03';

const sendAmount = 0.01;
const BIG_NUMBER_NANO_STC_MULTIPLIER = new BigNumber('1000000000');
const sendAmountSTC = new BigNumber(String(sendAmount), 10);
const sendAmountNanoSTC = sendAmountSTC.times(BIG_NUMBER_NANO_STC_MULTIPLIER);
const sendAmountHex = `0x${sendAmountNanoSTC.toString(16)}`

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const onBoardingRef = useRef(null);

  const handleConfirm = async () => {
    try {
      const currentUrl = new URL(window.location.href);
      const forwarderOrigin =
        currentUrl.hostname === 'localhost'
          ? 'http://localhost:9032'
          : undefined;
      try {
        onBoardingRef.current = new StarMaskOnboarding({ forwarderOrigin });
      } catch (error) {
        console.error(error);
      }
      const isStarMaskInstalled = StarMaskOnboarding.isStarMaskInstalled();
      if (!isStarMaskInstalled) {
        Modal.confirm({
          title: '提示',
          content: '检测到您未安装钱包，请先安装starmask钱包再进行购买',
          cancelButtonProps: { style: { display: 'none' } },
          okText: '去安装',
          onOk() {
            onBoardingRef.current.startOnboarding();
            Modal.confirm({
              title: '提示',
              content: '您是否已完成安装starmask钱包？',
              okText: '已完成',
              cancelText: '未完成',
              onOk() {
                handleConfirm();
              },
            });
          },
        });
      } else {
        let starcoinProvider = new providers.Web3Provider(
          window.starcoin,
          'any'
        );
        let connectedAccounts = await window.starcoin.request({
          method: 'stc_accounts',
        });
        if (!connectedAccounts.length) {
          // 如果检测到未连接，则调用连接方法
          connectedAccounts = await window.starcoin.request({
            method: 'stc_requestAccounts',
          });
        } else {
          // 如果检测到已连接，则停止轮询
          onBoardingRef.current.stopOnboarding();
        }
        console.log('connectedAccounts: ', connectedAccounts);

        const transactionHash = await starcoinProvider
          .getSigner()
          .sendUncheckedTransaction({
            to: toAccount,
            value: sendAmountHex,
            gasLimit: 1500000,
            gasPrice: 1,
          });
        console.log({ transactionHash })
      }
    } catch (e) {
      console.log(e);
      message.error('购买失败');
    }
  };

  return (
    <div>
      <Modal
        title="请填写购买信息"
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
        onOk={async () => {
          try {
            const values = await form.validateFields();
            values.address = addHexPrefix(values.address.toLowerCase())
            values.tradeaddr = addHexPrefix(values.tradeaddr)
            await request.post('/onekey/add', {
              ...values,
              area: values.area.join('-'),
            });
            setVisible(false);
          } catch (e) {
            message.error(e.message || '提交失败');
          }
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
            label="账号地址"
            name="address"
            rules={[
              {
                required: true,
                message: '请填写账号地址',
              },
            ]}
          >
            <Input placeholder="0x" />
          </FormItem>
          <FormItem
            label="交易 hash"
            name="tradeaddr"
            rules={[
              {
                required: true,
                message: '请填写交易 hash',
              },
            ]}
          >
            <Input placeholder="0x" />
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
              placeholder="省、市、区"
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
            label="详细地址"
            name="street"
            rules={[
              {
                required: true,
                message: '请填写详细地址',
              },
            ]}
          >
            <Input placeholder="小区楼栋/乡村名称" />
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
      <div className="detail" style={{ margin: '16px 0' }}>
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
          onClick={handleConfirm}
          style={{ marginRight: 8 }}
        >
          立即购买
        </Button>
        <Button
          shape="round"
          type="primary"
          danger
          size="large"
          onClick={() => {
            setVisible(true);
          }}
        >
          填写收货地址
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
