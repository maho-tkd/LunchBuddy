import React,{useState} from "react";
import CustomeButton from "../../components/customeButton";
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import style from './style.module.scss';

const Signup = () => {
  const [name , setName] = useState(""); //氏名
  const [password , setPassword] = useState(""); //PW
  // const [offices, setOffices] = useState([]); // オフィス名のリスト
  const [officeId , setOfficeId] = useState(""); //オフィス名
  const [floor , setFloor] = useState(""); //フロア
  const [seat , setSeat] = useState(""); //座席
  const [phoneNumber , setPhoneNumber] = useState(""); //電話番号

  const offices = [
    { id: 1, name: "MMオフィス" },
    { id: 2, name: "九段下オフィス"},
    { id: 3, name: "大手町オフィス"},
  ];

  const navigate = useNavigate();

  // const fetchOffices = async () => {
  //   try {
  //     const response = await fetch("/api/offices"); 
  //     if (!response.ok) {
  //       throw new Error("オフィス取得に失敗");
  //     }
  //     const data = await response.json(); 
  //     setOffices(data); 
  //     if (data.length > 0) {
  //       setOfficeId(data[0].value);
  //     }
  //   } catch (error) {
  //     console.error("オフィスが0件です:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchOffices();
  // }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, password, office, floor, seat, phoneNumber }); 
    if (!name) return;

    const newUser = {
      name,
      password,
      officeId,
      floor,
      seat,
      phoneNumber,
    };

    try {
      const response = await fetch("/api/signup", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
  
      if (!response.ok) {
        throw new Error("POSTに失敗"); 
      }
  
      const data = await response.json(); 
      console.log("登録内容:", data); 

      navigate("/requestList");
  
      // フィールドのリセット
      setName("");
      setPassword("");
      setOfficeId(""); 
      setFloor("");
      setSeat("");
      setPhoneNumber("");
      
    } catch (error) {
      console.error("登録に失敗しました:", error); 
    }
  };


  return (
    <div className={style.container}>
      <Typography variant="h4" className={style.title}>
        LunchBuddy
      </Typography>
      <Paper elevation={4} className={style.formContainer}>
        <Typography variant="h6" className={style.formTitle}>
          アカウント登録
        </Typography>
      <form onSubmit={handleSubmit}>
      <div>
          <TextField
            label="氏名"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            margin="normal"
          />
      </div>
      <div>
          <TextField
            label="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            margin="normal"
          />
      </div>
      <div>
            <FormControl required margin="normal" className = {style.selectField}>
              <InputLabel id="office-label">オフィス</InputLabel>
              <Select
                labelId="office-label"
                id="office"
                value={officeId}
                onChange={(e) => setOfficeId(e.target.value)}
              >
                <MenuItem value="">
                  <em>選択してください</em>
                </MenuItem>
                {offices.map((office) => (
                  <MenuItem key={office.id} value={office.id}>
                    {office.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
     </div>
      <div>
          <TextField
            label="フロア"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            required
            margin="normal"
          />
      </div>
      <div>
          <TextField
            label="座席"
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            required
            margin="normal"
          />
      </div>
      <div>
          <TextField
            label="電話番号"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            margin="normal"
          />
      </div>
      <CustomeButton text="登録" onClick={handleSubmit} />
      </form>
      </Paper>
    </div>
  );
};

export default Signup;
