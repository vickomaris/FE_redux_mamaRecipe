import React, { useState } from 'react';
import axios from 'axios';
import StyleRegister from './Register.module.css';
import Logo from '../../asset/img/Group697.svg';
import { Link, useNavigate } from "react-router-dom";
import { register } from '../../redux/action/register'
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    createNewPass: '',
    password: "",
    level: 1
  })

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(form)
    if (form.username == "" || form.email == "" || form.phone == "" || form.password == "") {
      alert('Semua input wajib diisi')
    } else {
      const body = {
        username: form.username,
        email: form.email,
        phone: form.phone,
        createNewPass: form.createNewPass,
        password: form.password,
        level: form.level
      }
      if (form.createNewPass !== form.password) {
        alert("password dan new password tidak sama")
      } else {
        dispatch(
          register(body)
            // axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, body)
            .then((response) => {
              // if(response.data.code !== 200){
              //     alert('error:' + response.data.message)
              // }
              if (response.data.status != 'success') {
                alert(response.data.message)
              } else {
                alert("data berhasil ditambahkan")
                console.log(response.data)
                return navigate('/')
              }
              // console.log(response.data)
              // return navigate('/')
            }).catch((err) => {
              console.error(err)
            })
        )

      }
    }

  }

  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          {/* <!-- leftside --> */}
          <div className={`col-md-6  ${StyleRegister.leftside}`}>
            <img src={Logo} alt="logo" className={StyleRegister.logo} />
          </div>
          {/* <!-- rightside --> */}
          <div className="col-md-6 d-flex align-items-center rightside">
            <form className="row g-3 m-5" onSubmit={(e) => onSubmit(e)}>
              <h1 className={StyleRegister.title}>Let’s Get Started !</h1>
              <p className={StyleRegister['sub-title']}>Create new account to access all features</p>
              <hr />
              <label htmlFor="name" className={StyleRegister.name}> Name</label>
              <input type="text" className="form-control" id={StyleRegister.inputName} placeholder="Name" onChange={(e) => setForm({ ...form, username: e.target.value })} />

              <label htmlFor="email" className={StyleRegister.email}> Email address*</label>
              <input type="email" className="form-control" id={StyleRegister.inputEmail} placeholder="Enter email address" onChange={(e) => setForm({ ...form, email: e.target.value })} />

              <label htmlFor="name" className={StyleRegister.phone}> Phone</label>
              <input type="text" className="form-control" id={StyleRegister.inputPhone} placeholder="08xxxxxxx" onChange={(e) => setForm({ ...form, phone: e.target.value })} />

              <label htmlFor="createNewPass" className={StyleRegister.createpassword}> Create New Password</label>
              <input type="password" className="form-control" id={StyleRegister.createpassword} placeholder="Create New Password" onChange={(e) => setForm({ ...form, createNewPass: e.target.value })} />

              <label htmlFor="password" className={StyleRegister.password}> New Password</label>
              <input type="password" className="form-control" id={StyleRegister.inputPassword} placeholder="New Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

              <div className="form-check">
                <input className={`form-check-input ${StyleRegister.checkbox}`} type="checkbox" value="" id="flexCheckDefault" />
                <label className={`form-check-label ${StyleRegister.agree}`} htmlFor="flexCheckDefault">
                  I agree of term conditions
                </label>
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className={`btn ${StyleRegister.btnregis}`}>
                  Register Account
                </button>
              </div>
              <div className="text-center">
                <p className={StyleRegister.login}>Already have account?  <Link to="/">  <span className={StyleRegister['login-page']}>Log in Here</span></Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register