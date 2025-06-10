import { useNavigate } from 'react-router';
import style from './Unauthorized.module.css'
export const Unauthorized = () => {
    const navigate = useNavigate()
  return (
    <div className={style.container}>
        <h1>ACCESO DENEGADO, NO TIENES EL ROL NECESARIO.</h1>
        <button onClick={() => {
            navigate("/")
        }}>VOLVER AL INICIO</button>
    </div>
  );
};