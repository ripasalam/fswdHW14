import { 
    Card,
    CardBody,
    CardFooter,
    Stack,
    Heading,
    Text,
    Container,
    Flex,
    SimpleGrid
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export default function Books({ id, title, author, image, publisher, year }) {
  return (
     <>
    <Link href={`/detailbook/${id}`}>
        <Card
        maxW='sm' 
        m={4}
        variant="elevated">              
            <CardBody>
                <Image
                src={`/uploads/${image}`}
                width = '500'
                height='500'
                alt=''
                borderradius='lg'
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>{title}</Heading>
                <Text>
                {author}
                </Text>
                </Stack>
            </CardBody>
        </Card>              
    </Link>       
    </>
    
  );
}