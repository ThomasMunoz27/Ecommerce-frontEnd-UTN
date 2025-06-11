import style from './PrivacyPolicy.module.css';

export const PrivacyPolicy = () => {
    return (
        <div className={style.containerPrincipal}>
            <div className={style.containerTitle}>
                <h1>Políticas de Privacidad</h1>
            </div>
            <div className={style.containerData}>
                <p>Última actualización: 10/06/2025</p>
                <p>
                    En <strong>Campeones.com</strong>, nos comprometemos a proteger la privacidad de
                    nuestros clientes. Esta política de privacidad explica cómo recopilamos, usamos,
                    compartimos y protegemos tu información personal.
                </p>

                <ol>
                    <li><strong>Información que recopilamos</strong></li>
                </ol>
                <p>
                    Cuando visitas nuestro sitio web o realizas una compra, podemos recopilar la
                    siguiente información:
                </p>

                <ul className={style.containerInformation}>
                    <div className={style.info}>
                        <h4>Datos personales</h4>
                        <p>Nombre, correo electrónico, número de teléfono, dirección de envío.</p>
                    </div>
                    <div className={style.info}>
                        <h4>Información de pago</h4>
                        <p>Tarjeta de crédito/débito u otros métodos de pago.</p>
                    </div>
                    <div className={style.info}>
                        <h4>Datos técnicos</h4>
                        <p>Dirección IP, tipo de navegador, dispositivo y ubicación aproximada.</p>
                    </div>
                </ul>

                <ol start={2}>
                    <li><strong>Uso de tu Información</strong></li>
                </ol>
                <p>Usamos tus datos personales para:</p>
                <ul>
                    <li>Procesar tus pedidos y transacciones.</li>
                    <li>Enviarte actualizaciones sobre el estado de tu compra.</li>
                    <li>Personalizar tu experiencia en nuestro sitio.</li>
                    <li>Informarte sobre promociones, ofertas o novedades (si has dado tu consentimiento).</li>
                </ul>

                <ol start={3}>
                    <li><strong>Compartir tu Información</strong></li>
                </ol>
                <p>
                    No vendemos, alquilamos ni intercambiamos tus datos personales. Sin embargo, podemos
                    compartir tu información con:
                </p>
                <ul>
                    <li>
                        <strong>Proveedores de servicios:</strong> Para procesar pagos, realizar envíos o
                        gestionar campañas de marketing.
                    </li>
                    <li>
                        <strong>Autoridades legales:</strong> Si es requerido por la ley o para proteger
                        nuestros derechos legales.
                    </li>
                </ul>

                <ol start={4}>
                    <li><strong>Seguridad de tu Información</strong></li>
                </ol>
                <p>
                    Adoptamos medidas de seguridad físicas, electrónicas y administrativas para proteger
                    tu información contra accesos no autorizados, pérdida o alteración.
                </p>

                <ol start={5}>
                    <li><strong>Tus Derechos</strong></li>
                </ol>
                <p>Tienes derecho a:</p>
                <ul>
                    <li>Acceder, corregir o eliminar tus datos personales.</li>
                    <li>Optar por no recibir comunicaciones promocionales.</li>
                    <li>
                        Solicitar una copia de los datos que hemos recopilado sobre ti. Para ejercer tus
                        derechos, contáctanos a través de <a href="mailto:contacto@campeones.com">contacto@campeones.com</a>.
                    </li>
                </ul>

                <ol start={6}>
                    <li><strong>Cookies y Tecnología de Seguimiento</strong></li>
                </ol>
                <p>
                    Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el
                    tráfico del sitio y personalizar el contenido. Puedes gestionar tus preferencias de
                    cookies en la configuración de tu navegador.
                </p>

                <ol start={7}>
                    <li><strong>Cambios en esta Política</strong></li>
                </ol>
                <p>
                    Nos reservamos el derecho de actualizar esta política de privacidad. Cualquier cambio
                    será publicado en esta página con una fecha de revisión actualizada.
                </p>

                <ol start={8}>
                    <li><strong>Contacto</strong></li>
                </ol>
                <p>
                    Si tienes preguntas sobre nuestras políticas de privacidad, puedes escribirnos a:
                </p>
                <ul>
                    <li>
                        <strong>Correo electrónico:</strong> <a href="contacto@campeones.com">contacto@campeones.com</a>
                    </li>
                    <li><strong>Teléfono:</strong> +5491123456789</li>
                </ul>
                <p>Gracias por confiar en <strong>Campeones.com</strong>. Estamos comprometidos a proteger tu privacidad.</p>
            </div>
        </div>
    );
};
