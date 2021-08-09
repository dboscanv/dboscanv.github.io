/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { IconContext } from "react-icons"
import { IoLogoGithub, IoLogoTwitter, IoLogoLinkedin } from "react-icons/io5"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/profile-pic.jpeg"
        width={90}
        height={90}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <div className="bio__description">
          <p>Software Engineer 👨‍💻 En constante aprendizaje.</p>
          <p>
            Haciendo algo de magia desde <strong>Montevideo, Uruguay.</strong>
          </p>
          <IconContext.Provider value={{ className: "bio__icons" }}>
            <div className="bio__networks">
              <a
                href="https://github.com/dboscanv"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoGithub />
              </a>
              <a
                href="https://in.linkedin.com/in/diego-boscan-586b16108"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoLinkedin />
              </a>
              <a
                href="https://twitter.com/dboscan"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoTwitter />
              </a>
            </div>
          </IconContext.Provider>
        </div>
      )}
    </div>
  )
}

export default Bio
