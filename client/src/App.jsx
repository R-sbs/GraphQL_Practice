import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ClientsTable from "./components/ClientsTable";
import { useEffect } from "react";
import { OnBoardForm } from "./components/OnBoardForm";
import { AddClientForm } from "./components/AddClientForm";
import { AddProjectForm } from "./components/AddProjectForm";
import ProjectCard from "./components/ProjectCard";
import Logout from "./components/Logout";
import TitleCard from "./components/TitleCard";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "./graphQL/project.mutation";
import { GET_PROJECTS } from "./graphQL/project.query";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user" || {}));
  const [projects, setProjects] = useState([]);

  const { loading, error, data } = useQuery(GET_PROJECTS);
  let gql_projects = data?.projects || [];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  if (!user || user.name === "") return <OnBoardForm />;

  return (
    <>
      <div className="flex flex-col h-screen">
        <header className="w-full sticky top-0 z-10 bg-blur-md bg-accent-foreground">
          <Header />
        </header>
        <div className="flex flex-row gap-4 p-2 items-baseline justify-between">
          <h1 className="text-lg font-bold pb-4">
            {"Hi,"}
            {user && user.name}
          </h1>
          <div className="flex gap-4">
            <AddClientForm />
            <AddProjectForm projects={projects} setProjects={setProjects} />
            <Logout />
          </div>
        </div>
        <div className="flex flex-wrap md:grid grid-cols-6 gap-8 p-8 grow h-full">
          <main className="w-full md:col-span-3">
            <TitleCard title='Clients' />
            <ClientsTable className="text-start p-4 my-4 shadow-accent border-2 rounded-lg bg-white" />
          </main>
          <aside className="w-full md:col-span-3">
            <TitleCard title="Projects" />
            <div className="grid grid-cols-2 gap-2 grid-flow-row my-4">
              {gql_projects &&
                gql_projects.map((project) => {
                  return <ProjectCard key={project.name} project={project} />;
                })}
            </div>
          </aside>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
}

export default App;
