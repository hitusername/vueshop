<template>
<div class="login_container">
    <div class="login_box">
        <!--头像区域 -->
        <div class="avatar_box">
            <img src="../assets/logo.png" alt="">
        </div>
        <!-- 登录表单区域 -->
        <el-form ref="loginFormRef" :rules="rules" :model="loginForm" label-width="0px" class="login_form">
            <!-- 用户名 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username"  prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item >
            <!-- 密码 -->
            <el-form-item prop="password" >
                <el-input show-password v-model="loginForm.password" prefix-icon="el-icon-unlock"></el-input>
            </el-form-item>
            <!-- 按钮 -->
             <el-form-item class="btns" >
                 <el-button type="primary" @click="login" >登录</el-button>
                 <el-button type="info" @click="resetloginForm">重置</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            //表单登录数据
            loginForm:{
                username:'admin',
                password:'123456'
            },
            rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          password:[
               { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
          },

        }
    },
    methods:{
        resetloginForm(){
           this.$refs.loginFormRef.resetFields()           
        },
        login(){
             this.$refs.loginFormRef.validate(
                 //验证规则
                async valid=>{
                    if(!valid) return;
                    //解构赋值获取 res.data

                 const  {data:res}  = await this.$http.post('login',this.loginForm)
                 console.log(res)
                 if(res.meta.status !==200) return this.$message.error(登录失败);
                 this.$message.success('登录成功');
                 window.sessionStorage.setItem("token",res.data.token);
                 this.$router.push("/home")
                 }
             )
        }
    },
}
</script>

<style lang="less" scoped>
.login_container {
    background-color: gray;
    height: 100%;
}

.login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box {
        position: absolute;
        left: 50%;

        transform: translate(-50%, -50%);
        width: 130px;
        height: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    .login_form{
        box-sizing: border-box;
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 20px;
        }
        .btns{
            display: flex;
            justify-content: flex-end;
            }
}
</style>
