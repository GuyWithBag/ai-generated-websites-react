import { websites } from "../shared/websites";

const Home = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen">
      <h1 className="text-3xl text-bold">AI Generated Websites</h1>
      <ul>
        {websites.map((site) => (
          <li key={site.path}>
            <a className="hover:text-blue-500 underline" href={site.path}>
              - {site.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
