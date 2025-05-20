import { Link } from 'react-router'

export default function BreadCrumbs({ paths, className }) {
  return (
    <nav aria-label="breadcrumb" className={`${className}`}>
      <ol className="flex list-none p-0 m-0">
        {paths.map((path, index) => (
          <li key={index} className="mr-2">
            {index < paths.length - 1 ? (
              <>
                <Link to={path.url} className="text-inherit underline">
                  {path.name}
                </Link>
                <span className="mx-2">/</span>
              </>
            ) : (
              <span>{path.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
