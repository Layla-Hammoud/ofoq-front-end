import styles from './SuccessModal.module.css'

const SuccessModel = ({isOpen, setIsopen, title,description }) => {
    console.log(isOpen)
  return (
    <>
      {isOpen && (
        <div className={`${styles.successTic} ${styles.modal} ${styles.fade}`} role="dialog">
          <div className={styles.modalDialog}>
            <div className={styles.modalContent}>
              <div className={`${styles.close} ${styles.closeLink}`} onClick={()=>{setIsopen(false)}}>
                &times;
              </div>
              <div className={styles.pageBody}>
                <div className={styles.head}>
                  <h3 style={{ marginTop: '5px' }}>{title}</h3>
                  <h4>{description}</h4>
                </div>

                <h1 style={{ textAlign: 'center' }}>
                  <div className={styles.checkmarkCircle}>
                    <div className={styles.background}></div>
                    <div className={`${styles.checkmark} ${styles.draw}`}></div>
                  </div>
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
export default SuccessModel;
