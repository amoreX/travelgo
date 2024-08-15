import { useState, useEffect } from "react";
import { Etiq } from "../../Utils/getetiq";
export default function Things({ city }) {
  const [etiq, setEtiq] = useState(null);

  useEffect(() => {
    const gettingEtiq = async () => {
      let g = await Etiq(city);
      setEtiq(g.split(","));
    };
    gettingEtiq();
  }, []);

  useEffect(() => {
    console.log(etiq);
  }, [etiq]);

  return (
    <div id="things-container">
      <div id="content-things">
        {etiq && (
          <div id="things">
            {etiq.map((each, ind) => {
              return (
                <div id="each-thing">
                  {ind <= 6 ? (
                    <>
                      <span style={{marginLeft:"20px",marginTop:"2px"}}>{each}</span>
                      <div id="bar"></div>
                    </>
                  ) : null}
                </div>
              );
            })}{" "}
          </div>
        )}

        {!etiq && <div>loading</div>}
      </div>
      <div id="title" style={{ color: "rgba(32, 70, 41, 0.45)", fontSize: "18px" }}>things to carry</div>
    </div>
  );
}
