import Link from "next/link"
import { useRouter } from "next/router"

export default function IndexPage() {
  const router = useRouter()
  return (
    <div className="m-40 flex justify-center">
      <div className="border-2 border-gray-200">
        <Link
          href="#1"
          className="grid cursor-pointer grid-cols-4 place-items-center space-x-2 border-b-2 border-gray-200 hover:bg-gray-600"
        >
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            One
          </div>
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            Two
          </div>
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            Three
          </div>
          <div className="p-4">Four</div>
        </Link>
        <Link
          href="#2"
          className="grid cursor-pointer grid-cols-4 place-items-center space-x-2 border-b-2 border-gray-200 hover:bg-gray-600"
        >
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            One
          </div>
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            Two
          </div>
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            Three
          </div>
          <div className="p-4">Four</div>
        </Link>
        <Link
          href="#3"
          className="grid cursor-pointer grid-cols-4 place-items-center space-x-2 hover:bg-gray-600"
        >
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            One
          </div>
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            Two
          </div>
          <div className="border-r-2 border-gray-200 p-4 last:border-r-0">
            Three
          </div>
          <div className="p-4">Four</div>
        </Link>
      </div>
      {/* <p>{`Students: ${router.query.id}`}</p> */}
    </div>
  )
}
