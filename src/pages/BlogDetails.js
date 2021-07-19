import { Helmet } from "react-helmet";
import Disqus from "disqus-react";
import React, { useEffect, useState } from "react";
import MarkDown from "markdown-to-jsx";
import Layout from "../components/Layout";

function BlogDetails(props) {
  const { match } = props;
  const [content, setContent] = useState("");
  const blogId = match.params.id;
  const blogFile = match.params.title;

  useEffect(() => {
    import(`../blog/${blogFile}.md`)
      .then(res => {
        fetch(res.default)
          .then(r => r.text())
          .then(rr => setContent(rr));
      })
      .catch(err => console.log(err));
  }, [blogFile]);

  const disqusShortname = "Bitlads-react"; // found in your Disqus.com dashboard
  const disqusConfig = {
    url: "https://tf-react-Bitlads.now.sh/", // Homepage link of this site.
    identifier: blogId,
    title: blogFile
  };

  return (
    <Layout>
      <Helmet>
        <title>Blog Details - Bitlads</title>
        <meta
          name="description"
          content="Bitlads Blog Details Page"
        />
      </Helmet>
      <div className="mi-blog-details mi-section mi-padding-top mi-padding-bottom">
        <div className="container">
          <MarkDown>{content}</MarkDown>
          <div className="mi-blog-details-comments mt-30">
            <Disqus.DiscussionEmbed
              shortname={disqusShortname}
              config={disqusConfig}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogDetails;
