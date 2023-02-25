import { ButtonGroup, Center, Container, IconButton, Stack, Text } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <Container as="footer" role="contentinfo" py={{ base: '12', md: '16' }}>
      <Center>
        <Stack spacing={{ base: '4', md: '5' }}>
          <Stack justify="space-between" direction="row" align="center">
            <ButtonGroup variant="ghost">
              <IconButton
                as="a"
                href="https://www.linkedin.com/in/frederik-junge/"
                aria-label="LinkedIn"
                icon={<FaLinkedin fontSize="1.25rem" />}
              />
              <IconButton as="a" href="https://github.com/Err0r51" aria-label="GitHub" icon={<FaGithub fontSize="1.25rem" />} />
              <IconButton
                as="a"
                href="https://twitter.com/Err0r51"
                aria-label="Twitter"
                icon={<FaTwitter fontSize="1.25rem" />}
              />
            </ButtonGroup>
          </Stack>
          <Text fontSize="sm" color="subtle">
            Created in {new Date().getFullYear()} by Err0r51 fuled by 🥑
          </Text>
        </Stack>
      </Center>
    </Container >
  )
}
