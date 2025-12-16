import useInputhandeler from "../../customHooc/inputHandeler";
import useLocalstoeage from "../../customHooc/localstoeage";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormControl } from "react-bootstrap";
import "./login.css";

export default function Login() {
  const [fName, changeFName] = useInputhandeler("");
  const [lName, changeLName] = useInputhandeler("");
  const [userName, changeUserName] = useInputhandeler("");
  const [email, changeEmail] = useInputhandeler("");
  const [password, changePassword] = useInputhandeler("");
  const [gender, setGender] = useState("");
  const [checkGender, setCheckGender] = useState(false);
  const [set] = useLocalstoeage();

  let manRaidoBtn = useRef(null);
  let womanRaidoBtn = useRef(null);
  const loc = useLocation();

  useEffect(() => {
    if (manRaidoBtn.current.checked === true) {
      setGender((prevGender) => "male");
    } else if (womanRaidoBtn.current.checked === true) {
      setGender((prevGender) => "female");
    }
  }, [checkGender]);
  const sendDataForServer = async () => {
    if (fName && lName && userName && email && password && gender) {
      const id = Math.floor(Math.random() * 100000);
      const userData = {
        id,
        fName,
        lName,
        userName,
        email,
        password,
        gender,
      };
      try {
        const response = await fetch(
          `https://admin-panel-d45dd-default-rtdb.firebaseio.com/users.json`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        );
        if (response.ok) {
          set("user-key", id);
          set("isLogin", true);
          window.location.href = '/'
        }
      } catch (error) {
        alert(error);
      } finally {
      }
    } else {
      alert("لطفا تمام اطلاعات خودرا وارد نمایید");
    }
  };

  return (
    <div className="login-page">
      <div className="form-page">
        <h2>به جمع ما بپوندید</h2>
        <div className="inputs">
          <lable>نام</lable>
          <FormControl
            className="input"
            value={fName}
            onChange={(e) => changeFName(e)}
          />
          <lab>نام خانوادگی</lab>
          <FormControl
            className="input"
            value={lName}
            onChange={(e) => changeLName(e)}
          />
          <lable>نام کاربری</lable>
          <FormControl
            className="input"
            value={userName}
            onChange={(e) => changeUserName(e)}
          />
          <lable>ایمیل</lable>
          <FormControl
            className="input"
            value={email}
            onChange={(e) => changeEmail(e)}
          />
          <lable>رمز عبور</lable>
          <FormControl
            className="input"
            value={password}
            onChange={(e) => changePassword(e)}
          />
          <div className="radio-buttons">
            <input
              type="radio"
              name="gender"
              id="man"
              ref={manRaidoBtn}
              onClick={() => setCheckGender(!checkGender)}
            />
            <label htmlFor="man">مرد</label>
            <input
              type="radio"
              name="gender"
              id="woman"
              ref={womanRaidoBtn}
              onClick={() => setCheckGender(!checkGender)}
            />
            <label htmlFor="woman">زن</label>
          </div>
          <div className="btn-parent">
            <button className="send-data-btn" onClick={sendDataForServer}>
              ورود
            </button>
          </div>
        </div>
      </div>
      <div className="login-page-image">
        <div className="login-image">
          <img src="https://wallpapercave.com/wp/wp12314280.jpg" />
        </div>
      </div>
    </div>
  );
}
