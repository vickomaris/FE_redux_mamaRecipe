import React, { useState, useEffect } from 'react'
import StyleProfile from './Profile.module.css'
import PhotoProfile from '../../asset/img/profile.png'
import PhotoFood1 from '../../asset/img/bombchicken.png'
import PhotoFood2 from '../../asset/img/bananaspancake.png'
import Footer from '../../Component/Footer'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



const Profile = () => {
  const [recipe, setRecipe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [iserror, setIsError] = useState(false);

  const data = JSON.parse(localStorage.getItem('data'));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/recipe/`)
      .then((response) => {
        console.log(response)
        setTimeout(() => {
          setRecipe(response.data.rows)
          setLoading(false);
        }, 2000);
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])

  const deleteFoods = (id, e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/recipe/${id}`)
      .then((response) => {
        console.log(response);
        console.log(response.data);

        const posts = recipe.filter((item) => item.id !== id);
        setRecipe({ data: posts });
        alert("Delete Success");
        return navigate('/landingpage')
      })
      .catch((err) => {
        console.log(err);
        alert("Delete Failed");
      });
  }
  return (
    <>
      {/* <!-- navbar --> */}
      <nav className="navbar navbar-expand-lg fixed-top bg-white">
        <div className="container">
          {/* <!-- <a className="navbar-brand" href="#">Mama Recipe</a> --> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
              <li className="nav-item mx-5">
                <Link className={`${StyleProfile['nav-link']} `} aria-current="page" to="/landingpage">Home</Link>
              </li>
              <li className="nav-item mx-5">
                <Link className={`${StyleProfile['nav-link']} `} to="/addrecipe">Add Recipe</Link>
              </li>
              <li className="nav-item mx-5">
                <Link className={`${StyleProfile['nav-link']} ${StyleProfile.active}`} to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- photo profile --> */}
      <section className="profile">
        <div className="container-fluid">
          <div className="row">
            <div className={`col-md-12 d-flex flex-column justify-content-center align-items-center ${StyleProfile.photo}`}>
              <img src={PhotoProfile} alt="" />
              <p>
                <i className={`fa-solid fa-pencil fa-1x ${StyleProfile.pencil}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                </i>
              </p>
              <div className={`collapse ${StyleProfile.collcostum}`} id="collapseExample">
                <div className={`card card-body ${StyleProfile.edit}`}>
                  Change Photo Profile
                </div>
                <div className={`card card-body ${StyleProfile.edit}`}>
                  <Link to="/resetpassword">Change Password</Link>
                </div>
              </div>
              <h1 className={`${StyleProfile.username} mt-5`}>
                {/* Garneta Sharina  */}
                {data.username}
              </h1>
              <hr className={StyleProfile.line} />
            </div>
          </div>
        </div>
      </section>
      {/* <!-- menu --> */}
      <section className="menu">
        <div className="container-fluid">
          <div className="row">
            <div className={`col-md-12 d-flex flex-row ${StyleProfile.menucostum}`} style={{ marginLeft: '50px' }}>
              <p className={`mx-5 ${StyleProfile.myrecipe}`} type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse2" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">
                My Recipe
              </p>
              <p className={`mx-5 ${StyleProfile.savedrecipe}`} type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">
                Saved Recipe
              </p>
              <p className={`mx-5 ${StyleProfile.likedrecipe}`} type="button" data-bs-toggle="collapse" data-bs-target=".multi-collapse" aria-expanded="false" aria-controls="multiCollapseExample1 multiCollapseExample2">
                Liked Recipe
              </p>
            </div>
            <hr className={StyleProfile.linemenu} />
            <div className=" collapse multi-collapse2" id="foods1" >
              <div className="row d-flex flex-row  kolom2">
                {
                  loading ? (
                    <h2>Loading</h2>
                  ) : (
                    recipe.map((item) => {
                      return (
                        <>
                          <div key={item.id} className={`col-md-4 my-3 d-flex flex-row ${StyleProfile.foodbox}`}>
                            {/* {data.photo} */}
                            {/* {data.title} */}
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${item.photo}`} className={StyleProfile.gambar} />
                            <p className={`mx-1 ${StyleProfile.titlefood}`}>
                              {/* Bananas Pancake */}
                              {item.title}
                            </p>

                            <Link to={`/detailrecipe/${item.id}`}> <button className={StyleProfile.btndetail} type="button" > <i className="fa-solid fa-eye"></i> </button> </Link>

                            <Link to={`/updaterecipe/${item.id}`} > <button className={StyleProfile.btnupdate} > <i className="fa-solid fa-pen-to-square"></i></button></Link>

                            <button className={StyleProfile.btndelete} onClick={(e) => deleteFoods(item.id, e)} > <i className="fa-solid fa-trash"></i></button>
                          </div>
                        </>
                      )
                    })
                  )
                }
              </div>
            </div>

            {/* DIBAWAH INI DESIGN FOOD BIASA */}
            <div className="row">
              <div className="col-md-4  kolom1">
                <div className="collapse multi-collapse" id="foods1" >
                  <div className={StyleProfile.foodbox}>
                    <img src={PhotoFood1} alt="" className={StyleProfile.gambar} />
                    <p className={`col-md-2 ${StyleProfile.titlefood}`}>
                      Bomb Chicken
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 kolom2">
                <div className="collapse multi-collapse" id="foods1" >
                  <div className={StyleProfile.foodbox}>
                    <img src={PhotoFood2} alt="" className={StyleProfile.gambar} />
                    <p className={`col-md-2 ${StyleProfile.titlefood}`}>
                      Bananas Pancake
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ))} */}
          </div>
        </div>
      </section>
      {/* <!-- footer --> */}
      <Footer />
    </>
  )
}

export default Profile