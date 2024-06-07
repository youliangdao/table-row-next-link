import { useRouter } from "next/router"

export default function IndexPage() {
  const router = useRouter()
  return <p>{`Students: ${router.query.id}`}</p>
}
