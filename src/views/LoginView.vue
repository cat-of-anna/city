<template>
  <div>
    <div class="main">
      <div class="loginBox">
        <div class="tabBoxSwitch">
          <div class="tabBoxSwitchUi">
            <li :class="tabSelected===index?'tab-active':''" v-for="(txt, index) in tabList" :key="index" @click="tabSelected = index">{{ txt }}</li>
          </div>

          <div v-show="tabSelected === 0">
            <el-form :model="userForm" ref="userForm" :rules="userRules">
<!--              :error="userFormError.username"-->
              <el-form-item prop="username">
                <el-input v-model="userForm.username" placeholder="用户名或手机号"></el-input>
              </el-form-item>
<!--              :error="userFormError.password"-->
              <el-form-item prop="password">
                <el-input type="password" v-model="userForm.password" show-password placeholder="密码"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" size="medium" @click="submitForm('userForm')">登 录</el-button>
              </el-form-item>
            </el-form>
          </div>

          <div v-show="tabSelected === 1">
            <el-form :model="smsForm" ref="smsForm" :rules="smsRules">
              <el-form-item prop="phone">
                <el-input v-model="smsForm.phone" placeholder="手机号"></el-input>
              </el-form-item>

              <el-form-item prop="code">
                <el-row type="flex" justify="space-between">
                  <el-input v-model="smsForm.code" placeholder="验证码"></el-input>
                  <el-button :disabled="btnDisabled" style="margin-left: 10px;" @click="sendSmsCode">
                    {{ txtSendCode }}
                  </el-button>
                </el-row>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" size="medium" @click="submitForm('smsForm')">登 录</el-button>
              </el-form-item>

            </el-form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data(){
    return {
      tabList: ['密码登录', '免密登录'],
      tabSelected: 0,   // 默认密码登录
      userForm:{  // 密码登录，用户登录表单
        username: '',
        password: '',
      },
      userFormError:{
        username: '',
        password: '',
      },
      smsForm:{   // 免密登录，用户登录表单
        phone: '',
        code: '',
      },
      userRules:{   // 密码登录，校验规则
        username: [
          {required: true, message: '请输入用户名或手机号', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      },
      smsRules:{    // 免密登录，校验规则
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {pattern: /^1[3456789]\d{9}$/, message: '手机格式错误', trigger: 'blur'},  // 格式验证
        ],
        code: [
          {required: true, message: '请输入验证码', trigger: 'blur'},
        ]
      },
      btnDisabled: false,
      txtSendCode: '发送验证码'


    }
  },
  methods: {
    submitForm(formName) {
      // 清空原来的错误
      this.clearCustomerError();
      // 验证表单
      this.$refs[formName].validate((valid)=> {
        if(!valid){
          console.log("验证未通过");
          return false;  // 验证未通过
        }
        // 验证通过，发送ajax请求
        this.axios.post("/base/auth/", this.userForm).then(res=> {
            if(res.data.code === 0){
              // 登录成功
              this.$store.commit("login", res.data.data);
              this.$router.push({path: '/'});
              return;
            }
            // 1000，验证字段错误
            if(res.data.code === 1000){
              this.validateFormFailed(res.data.detail);
              return;
            }
            // 1001,整体错误
            if(res.data.code === 1001){
              this.$message.error(res.data.detail);
            }else {
              this.$message.error('请求失败');
            }
          })
      });
    },

    sendSmsCode() {
      this.$refs.smsForm.validateField("phone", (error)=> { // 错误信息
        if (error){
          return false;
        }else {
          // 拿到手机号，向后台发送请求 -> 发送验证码
          this.btnDisabled = true;    // 验证码按钮禁用
          // 验证码按钮倒计时
          let timeDisabled = 10;
          let codeSendInterval = setInterval(() => {    // 设置定时器，最后要清除定时器
            timeDisabled -= 1;
            this.txtSendCode = `${timeDisabled}秒后重发`
            if(timeDisabled < 1) {
              this.txtSendCode = '重新发送';  // 重新发送
              this.btnDisabled = false;   // 验证码发送按钮启用
              window.clearInterval(codeSendInterval);   // 清除定时器
            }
          }, 1000);
          return true
        }
      });
    },

    validateFormFailed(errorData) {
      for (let fileName in errorData) {
        this.userFormError[fileName] = errorData[fileName][0];
      }
    },

    clearCustomerError() {
      for (let key in this.userFormError) {
        this.userFormError[key] = "";
      }
    },

  }
}
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100vh;
    background-color: #2E3E9C;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .loginBox{
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    border-radius: 2px;
    width: 300px;
    min-height: 200px;
    padding: 0 24px 20px;

  }

  .tabBoxSwitch .tabBoxSwitchUi {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .tabBoxSwitch .tabBoxSwitchUi li {
    display: inline-block;
    height: 60px;
    font-size: 16px;
    line-height: 60px;
    margin-right: 24px;
    cursor: pointer;
  }

  .tab-active {
    position: relative;
    color: #1a1a1a;
    font-weight: 600;
    font-synthesis: style;
  }

  .tab-active::before {
    display: block;
    position: absolute;
    bottom: 10px;
    content: "";
    width: 100%;
    height: 3px;
    background-color: #0084ff;
  }
</style>