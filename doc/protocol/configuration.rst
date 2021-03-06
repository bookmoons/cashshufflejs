Configuration
-------------

`cashshufflejs` uses this configuration for conformance with the reference
implementation:

- For encryption strings are encoded to UTF-8 without BOM.
- For encryption byte strings are encoded to Base64 with standard alphabet
  then to UTF-8 without BOM.
- For transfer signing public keys are encoded to `HexString`.
- For transfer encryption public keys are encoded to `HexString`.
- For transfer encrypted output list items are encoded to Base64 with standard
  alphabet.
- Message types are defined with protobuf_.
- For signing packets are serialized to the `protobuf wire format`_.
- Every set of sent messages is packaged in a single ``Packets`` containing a
  list of ``Signed``. A single sent message is packaged in a unary list.
- Messages are received as separate ``Signed`` instances.
- For wire transfer messages are serialized to the `protobuf wire format`_.
- Messages on the wire are delimited using a separator scheme. Each wire
  message is terminated withe the Unicode character `U+23CE Return Symbol`_
  in UTF-8. That encodes to the 3 byte sequence ``e2 8f 8e``.

.. _protobuf: https://developers.google.com/protocol-buffers/
.. _protobuf wire format:
   https://developers.google.com/protocol-buffers/docs/encoding
.. _`U+23CE Return Symbol`: https://codepoints.net/U+23CE
