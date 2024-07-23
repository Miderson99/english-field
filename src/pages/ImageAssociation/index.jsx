import { useEffect, useState, useRef } from "react";
import styles from "./ImageAssociation.module.scss";

import { dataImageAssociation } from "../../banco/dataImageAssociation";
import { getShuffleArray } from "../../utils/getShuffleArray";
import { generateRandomIntefer } from "../../utils/generateRandomInterfer";
import classNames from "classnames";

// Embaralhar o array de objetos
let shuffledArraydata = getShuffleArray(dataImageAssociation);

function generateRandomNumersImages(rightImage) {
  rightImage = parseInt(rightImage, 10); // Convertendo rightImage para número

  if (shuffledArraydata.length < 2) {
    return ["error", "error"];
  }

  let n1 = generateRandomIntefer(shuffledArraydata.length);
  console.log(`n1 inicial: ${n1}`);

  while (n1 === rightImage) {
    n1 = generateRandomIntefer(shuffledArraydata.length);
    console.log(`Novo n1: ${n1}`);
  }

  let n2 = generateRandomIntefer(shuffledArraydata.length);
  console.log(`n2 inicial: ${n2}`);

  while (n2 === rightImage || n2 === n1) {
    n2 = generateRandomIntefer(shuffledArraydata.length);
    console.log(`Novo n2: ${n2}`);
  }

  console.log(`Números finais: n1 = ${n1}, n2 = ${n2}`);
  return [n1, n2];
}

const ImageAssociation = () => {
  const [currentId, setCurrentId] = useState(0);
  // const [listTest, setListTest] = useState([
  //   {
  //     idExam: currentId,
  //     childrenElement: {
  //       id: "",
  //       image: "",
  //       audio: "",
  //       description: "",
  //     },
  //     image: {
  //       image1: "",
  //       image2: "",
  //       image3: "",
  //     },
  //     rightPositionImage: "",
  //     positionSelected: null,
  //     stateAnsweredCorrect: null,
  //   },
  // ]);
  const [listTest, setListTest] = useState([]);

  const [currentIdAgain, setCurrentIdAgain] = useState(0);
  const [starter, setStarter] = useState(false);
  const [endTest, setEndTest] = useState(false);
  const [finalizationTest, setFinalizationTest] = useState(false);

  useEffect(() => {
    if (starter) {
      if (!listTest[currentId]) {
        console.log("entrou");
        const rightPositionImage = generateRandomIntefer(3);
        const element = shuffledArraydata[currentId];

        function showItem() {
          console.log(element);
          const arrayPositionImages = [1, 2, 3].filter(
            (e) => e !== rightPositionImage
          );

          const arrayNumberRandomImages = generateRandomNumersImages(
            element.image.split(".jpg").join("")
          );
          console.log(rightPositionImage);
          const image = {
            [`image${rightPositionImage}`]: `/public/ImageAssociation/images/${element.image}`,
            [`image${arrayPositionImages[0]}`]: `./public/ImageAssociation/images/${arrayNumberRandomImages[0]}.jpg`,
            [`image${arrayPositionImages[1]}`]: `public/ImageAssociation/images/${arrayNumberRandomImages[1]}.jpg`,
          };
          if (currentId === 0) {
            setListTest((prev) => [
              {
                idExam: currentId,
                childrenElement: element,
                image: image,
                rightPositionImage: rightPositionImage,
                positionSelected: null,
                stateAnsweredCorrect: null,
              },
            ]);
          } else {
            setListTest((prev) => [
              ...prev,
              {
                idExam: currentId,
                childrenElement: element,
                image: image,
                rightPositionImage: rightPositionImage,
                positionSelected: null,
                stateAnsweredCorrect: null,
              },
            ]);
          }
          setCurrentIdAgain(currentId);
        }
        showItem();
      } else {
        setCurrentIdAgain(currentId);
      }
    }
  }, [starter, currentId]);

  const [stylesImages, setStylesImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  useEffect(() => {
    if (starter) {
      const objectInquestion = listTest[currentId];
      console.log(objectInquestion);
      const rightP = `image${objectInquestion.rightPositionImage}`;
      const positionSelected = `${objectInquestion.positionSelected}`;
      const isCorretAnsewer = objectInquestion.stateAnsweredCorrect; // Mantém como booleano ou null

      const justNumberPosiotionSelected = positionSelected.split("image").join('');
      const rightNumber = parseInt(justNumberPosiotionSelected, 10); // Convertendo rightImage para número


      const arrayPositionImages = [1, 2, 3].filter(
        (i) => i !== objectInquestion.rightPositionImage
      );
      const arrayPositionImages2 = arrayPositionImages.filter(
        (i) => i !== rightNumber
      );

      if (isCorretAnsewer === true) {
        setStylesImages({
          [rightP]: "correct",
          [`image${arrayPositionImages[0]}`]: null,
          [`image${arrayPositionImages[1]}`]: null,
        });
      } else if (isCorretAnsewer === false) {
        setStylesImages({
          [rightP]: "rightAnswer",
          [positionSelected]: "wrong",
          [`image${arrayPositionImages2[0]}`]: null,
        });
      } else if (isCorretAnsewer === null) {
        setStylesImages({
          image1: null,
          image2: null,
          image3: null,
        });
      }
    }
  }, [currentIdAgain]);

  
  const refAudioCongratulations = useRef(null)
  
  const verifyAttempt = (e, eRight) => {

    

    if (!listTest[currentId].positionSelected) {
      setListTest((prev) => {
        return prev.map((i) =>
          i.idExam === currentId ? { ...i, positionSelected: e } : i
        );
      });

      const arrayPositionImages = [1, 2, 3].filter((i) => i !== eRight);
      const arrayFormated = arrayPositionImages.map((i) => `image${i}`);
      const nameCorrectFormated = `image${eRight}`;
      if (nameCorrectFormated === e) {

        const audioCorrect = refAudioCongratulations.current;
        audioCorrect.play()

        setStylesImages((prev) => ({
          ...prev,
          [e]: "correct",
        }));

        setListTest((prev) =>
          prev.map((item, index) =>
            index === currentId ? { ...item, stateAnsweredCorrect: true } : item
          )
        );
      } else {
const audioError = document.querySelector('#audioError');
        audioError.play()
        setStylesImages({
          [nameCorrectFormated]: "rightAnswer",
          [arrayFormated[0]]: "wrong",
          [arrayFormated[1]]: "wrong",
        });
        setListTest((prev) =>
          prev.map((item, index) =>
            index === currentId
              ? { ...item, stateAnsweredCorrect: false }
              : item
          )
        );
      }
    }
  };

  const refAudio = useRef(null);
  useEffect(() => {
    if (listTest[currentId]) {
      const element = refAudio.current;
      if (element) {
        element.play();
      }
    }
  }, [currentId, listTest]);

  // const [currentStateCorretOrWrong, setCurrentStateCorretOrWrong] = useState(listTest[currentIdAgain].stateAnsweredCorrect);

  function changeCurrentId(value) {
    
    console.log(currentId);
    console.log("clique");
    // Verifica se currentId é igual a 0
    if (currentId === 0) {
      if (!listTest[currentId + 1] && value > 0) {
        setCurrentId(currentId + value);
      } else if (value > 0) {
        setCurrentId(currentId + value);
      } else {
        return;
      }
    } else {
      // Atualiza currentId somando o valor fornecido
      setCurrentId(currentId + value);
    }
  }

const [acertos, setAcertos]= useState(0)
const [erros, setErros]= useState(0)
  

  useEffect(()=>{
    if(currentId===shuffledArraydata.length-1)
      setEndTest(true);
  },[currentId])

  function endingTest() {

    setAcertos(listTest.reduce((acumulador, valorAtual) => {
      return acumulador + (valorAtual.stateAnsweredCorrect ? 1 : 0);
    }, 0))
     setErros(listTest.reduce((acumulador, valorAtual) => {
      return acumulador + (valorAtual.stateAnsweredCorrect ===false ? 1 : 0);
    }, 0))

    const audioSucess= document.querySelector("#audioSucess");
    audioSucess.play();

    setFinalizationTest(true);
    
    console.log(acertos);
    console.log(erros)
  }

  function restart() {
    setListTest([]);
    shuffledArraydata = getShuffleArray(dataImageAssociation);
    setStarter(false);
    setEndTest(false);
    setFinalizationTest(false);
    setCurrentId(0);
    setCurrentIdAgain(0);
    setStylesImages({
      image1: null,
      image2: null,
      image3: null,
    })
  };


  return (
    <>
     <div style={{display: 'none'}} >
        <audio
        ref={refAudioCongratulations}
          id="audioCongratulations"
          src={`../public/soundsEffects/congratulations.mp3`}
          controls
        ></audio>
        <audio
          id="audioError"
          src={`../public/soundsEffects/error.mp3`}
          controls
        ></audio>
        <audio
          id="audioSucess"
          src={`../public/soundsEffects/success.mp3`}
          controls
        ></audio>
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={`${styles.heading} ${styles}`}>Image Association</h1>
          <hr className={styles.divider}></hr>
        </header>

        {starter && listTest.length && !finalizationTest ? (
          <div>
            {/* <i className={`${styles.icon} bx bxs-volume-full`}></i> */}
            {listTest[currentIdAgain].positionSelected ? (    <h2 id="description" className={styles.subheading}>
              {listTest[currentIdAgain].childrenElement.description}
            </h2>) : ''}
        
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <audio
                src={`/public/ImageAssociation/audios/UK/Som ${listTest[currentIdAgain].childrenElement.id}.mp3`}
                id="audioElement"
                controls
              />
              <audio
                ref={refAudio}
                src={`public/ImageAssociation/audios/US/Som ${listTest[currentIdAgain].childrenElement.id}.mp3`}
                id="audioElement"
                controls
              />
            </div>
            <div className={styles.images}>
              <img
                className={classNames(
                  styles.image1,
                  styles[stylesImages.image1]
                )}
                onClick={(e) =>
                  verifyAttempt(
                    e.target.id,
                    listTest[currentIdAgain].rightPositionImage
                  )
                }
                id="image1"
                src={
                  listTest[currentIdAgain].image.image1
                    ? listTest[currentIdAgain].image.image1
                    : "./public/imageAssociation/images/error.jpeg"
                }
                alt="Pencil Holder"
              />
              <img
                className={classNames(
                  styles.image2,
                  styles[stylesImages.image2]
                )}
                onClick={(e) =>
                  verifyAttempt(
                    e.target.id,
                    listTest[currentIdAgain].rightPositionImage
                  )
                }
                id="image2"
                src={
                  listTest[currentIdAgain].image.image2
                    ? listTest[currentIdAgain].image.image2
                    : "../public/imageAssociation/images/error.jpeg"
                }
                alt="Power Strip"
              />
              <img
                className={classNames(
                  styles.image3,
                  styles[stylesImages.image3]
                )}
                id="image3"
                src={
                  listTest[currentIdAgain].image.image3
                    ? listTest[currentIdAgain].image.image3
                    : "../public/imageAssociation/images/error.jpeg"
                }
                onClick={(e) =>
                  verifyAttempt(
                    e.target.id,
                    listTest[currentIdAgain].rightPositionImage
                  )
                }
                alt="USB Cable"
              />
            </div>
            <div className={styles.stats}>
              <p className={styles.total}>{`${currentIdAgain + 1}/${
                shuffledArraydata.length 
              }`}</p>
            </div>
            
            <div className={styles.navigation}>
              {/* <i className={`${styles.icon} bx bx-revision`}></i> */}
              <i
                onClick={() => {
                  changeCurrentId(-1);
                }}
                className={`${styles.icon} bx bx-left-arrow-circle`}
              ></i>
              <button
                 style={{backgroundColor: "transparent"}}
                onClick={() => {
                  changeCurrentId(1);
                }}
                disabled={
                  listTest[currentIdAgain].positionSelected === null || shuffledArraydata.length - 1 === currentId && listTest[currentIdAgain].positionSelected ? true : false
                }
              >
                <i className={`${styles.icon} bx bx-right-arrow-circle`}></i>
              </button>
             
            </div>
            
            {endTest && listTest[currentId].positionSelected? (<button onClick={() => endingTest()}>Finalizar</button>) : ''}

          </div>
        ) : (
          <>
            {finalizationTest
            
            ? (
              <>
               <p>Acertos: {acertos}</p>
               <p>erros: {erros}</p>
              <button onClick={() => restart()} style={{backgroundColor: "transparent"}}>
               <i className={`${styles.icon} bx bx-revision`}></i>
              </button>


              </>
            )  
            
            : (
              <div>
              <button className={styles.button} onClick={() => setStarter(true)}>Start</button>
              <p
                className={styles.total}
              >{`Total: ${shuffledArraydata.length}`}</p>
            </div>
            )}
          </>
          
        )}
      
      </div>
    </>
  );
};

export default ImageAssociation;
