Configuration
-------------

`cashshufflejs` uses this configuration for conformance with the reference
implementation:

- Message types are defined with protobuf_.
- For wire transfer messages are serialized to the `protobuf wire format`_.
- Messages on the wire are delimited using a separator scheme. Each wire
  message is terminated withe the Unicode character `U+23CE Return Symbol`_
  in UTF-8. That encodes to the 3 byte sequence ``e2 8f 8e``.
- For encryption strings are encoded to UTF-8 without BOM.
- For encryption byte strings are encoded to Base64 with standard alphabet
  then to UTF-8 without BOM.
- For transfer signing public keys are encoded to `HexString`.
- For transfer encryption public keys are encoded to `HexString`.
- For signing packets are encoded to undelimited wire format.

.. _protobuf: https://developers.google.com/protocol-buffers/
.. _protobuf wire format:
   https://developers.google.com/protocol-buffers/docs/encoding
.. _`U+23CE Return Symbol`: https://codepoints.net/U+23CE
