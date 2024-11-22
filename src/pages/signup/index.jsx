import React,{useState} from "react";
import CustomeButton from "../../components/customeButton";
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>アカウント登録</h2>
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="name">氏名</label>
          <input
            type="text" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
      </div>
      <div>
          <label htmlFor="password">パスワード</label>
          <input
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
      </div>
      <div>
          <label htmlFor="office">オフィス</label>
          <select
            id="office"
            value={officeId}
            onChange={(e) => setOfficeId(e.target.value)}
            required
          >
            <option value="">選択してください</option>
            {offices.map((office) => (
              <option key={office.id} value={office.id}>
                {office.name}
              </option>
            ))}
          </select>
        </div>
      <div>
          <label htmlFor="name">フロア</label>
          <input
            type="text" 
            id="floor" 
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            required
          />
      </div>
      <div>
          <label htmlFor="seat">座席</label>
          <input
            type="text" 
            id="seat" 
            value={seat}
            onChange={(e) => setSeat(e.target.value)}
            required
          />
      </div>
      <div>
          <label htmlFor="phonenumber">電話番号</label>
          <input
            type="tel" 
            id="phonenumber" 
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
      </div>
      <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default Signup;
