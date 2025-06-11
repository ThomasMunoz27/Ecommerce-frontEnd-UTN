import { Navigate, Outlet } from "react-router";
import { useStoreUsers } from "../../../store/useStoreUsers";
import { getUserByName } from "../../../cruds/crudUsers";
import { useEffect, useState } from "react";
import styles from './RequireAdmin.module.css'
export const RequireAdmin = () => {
  const { user, setUser } = useStoreUsers();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const username = localStorage.getItem("username");
      if (username) {
        const usuario = await getUserByName(username);
        setUser(usuario);
      }
      setLoading(false);
    };
    fetchUser();
  }, [setUser]);

  if (loading) {
    // Podés devolver un loader o null mientras carga el usuario
    return <div className={styles.textContainer}>Cargando datos...</div>;
  }

  // Asumo que el rol está en user.role, cambiá según tu estructura real
  if (!user || user.user !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};
