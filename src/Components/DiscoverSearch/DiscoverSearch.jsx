function DiscoverSearch({ searchQuery }) {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </InputGroup.Text>
      <Form.Control
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          getMoviesByQuery(e.target.value);
        }}
        placeholder="Search..."
        aria-label="Search..."
        aria-describedby="basic-addon1"
      />
    </InputGroup>
  );
}

export default DiscoverSearch;
