import React from "react";
import "./styles/Texto.css";

function AppInfo() {
  return (
    <div className="card-container">
      <div className="app-info-column">
        <div className="card">
          <h2>Propósito de la Aplicación</h2>
          <p>
            Automatizar un proceso replicable para aplicar la metodología de
            analítica de textos en la construcción de modelos analíticos.
            Desarrollar una aplicación que utilice un modelo analítico basado en
            aprendizaje automático y sea de interés para una organización,
            empresa o institución y en particular para un rol existente en
            alguna de ellas. Interactuar con un grupo interdisciplinario para
            validar y mejorar la calidad de la solución analítica planteada y
            del producto de software construido. El desarrollo de soluciones
            analíticas basadas en modelos analíticos para una organización
            incluye la participación de diferentes roles. En particular, en ese
            proceso de desarrollo, haremos énfasis en los roles del científico
            de datos, ingeniero de datos e ingeniero de software.
          </p>
        </div>
      </div>

      <div className="app-info-column">
        <div className="card" style={{ width: "500px" }}>
          <h2>Objetivos de Desarrollo Sostenible (ODS) Utilizados</h2>
          <ul>
            <li>
              Objetivo 3: Garantizar una vida sana y promover el bienestar para
              todos en todas las edades
            </li>
            <li>
              Objetivo 4: Garantizar una educación inclusiva, equitativa y de
              calidad y promover oportunidades de aprendizaje durante toda la
              vida para todos
            </li>
            <li>
              Objetivo 5: Lograr la igualdad entre los géneros y empoderar a
              todas las mujeres y las niñas
            </li>
          </ul>
        </div>
      </div>

      <div className="app-info-column">
        <div className="card">
          <h2>¿Qué es un ODS y Cómo se Puede Predecir?</h2>
          <p>
            Los Objetivos de Desarrollo Sostenible (ODS) son un conjunto de
            metas globales establecidas por las Naciones Unidas para abordar
            desafíos socioeconómicos y medioambientales en todo el mundo. Para
            predecir el progreso hacia la consecución de estos objetivos, se
            utilizan técnicas de análisis de datos y aprendizaje automático.
            Esto implica recopilar y analizar datos relevantes, identificar
            patrones y tendencias, y utilizar modelos analíticos para hacer
            predicciones sobre el avance hacia los ODS. Estas predicciones
            pueden ser valiosas para la toma de decisiones y la planificación de
            políticas que contribuyan al logro de los ODS.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppInfo;
